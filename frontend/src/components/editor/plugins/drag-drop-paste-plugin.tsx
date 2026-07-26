"use client"

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { useEffect } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { DRAG_DROP_PASTE } from "@lexical/rich-text"
import { $wrapNodeInElement, isMimeType } from "@lexical/utils"
import {
  $createParagraphNode,
  $getNodeByKey,
  $insertNodes,
  $isRootOrShadowRoot,
  COMMAND_PRIORITY_LOW,
} from "lexical"
import { toast } from "sonner"

import {
  $createImageNode,
  $isImageNode,
} from "@/components/editor/nodes/image-node"
import { uploadToCloudinary } from "@/utils/cloudinary"

const ACCEPTABLE_IMAGE_TYPES = [
  "image/",
  "image/heic",
  "image/heif",
  "image/gif",
  "image/webp",
]

export function DragDropPastePlugin(): null {
  const [editor] = useLexicalComposerContext()
  useEffect(() => {
    return editor.registerCommand(
      DRAG_DROP_PASTE,
      (files) => {
        ;(async () => {
          for (const file of files) {
            if (isMimeType(file, ACCEPTABLE_IMAGE_TYPES)) {
              // 1. Create a local preview URL
              const previewUrl = URL.createObjectURL(file)
              let nodeKey: string | null = null

              // 2. Insert image node immediately with local preview & uploading state
              editor.update(() => {
                const imageNode = $createImageNode({
                  altText: file.name,
                  src: previewUrl,
                  isUploading: true,
                  uploadProgress: 0,
                })
                $insertNodes([imageNode])
                if ($isRootOrShadowRoot(imageNode.getParentOrThrow())) {
                  $wrapNodeInElement(imageNode, $createParagraphNode).selectEnd()
                }
                nodeKey = imageNode.getKey()
              })

              try {
                // 3. Upload to Cloudinary with progress tracking
                const result = await uploadToCloudinary(file, {
                  onProgress: ({ percent }) => {
                    if (nodeKey) {
                      editor.update(() => {
                        const node = $getNodeByKey(nodeKey!)
                        if ($isImageNode(node)) {
                          node.setUploadProgress(percent)
                        }
                      })
                    }
                  },
                })

                if (result?.secure_url) {
                  // 4. Update image node with real Cloudinary URL & remove overlay
                  editor.update(() => {
                    if (nodeKey) {
                      const node = $getNodeByKey(nodeKey!)
                      if ($isImageNode(node)) {
                        node.setSrc(result.secure_url)
                        node.setIsUploading(false)
                        node.setUploadProgress(100)
                      }
                    }
                  })
                  toast.success("Image uploaded successfully")
                } else {
                  throw new Error("Missing secure_url from upload response")
                }
              } catch (error) {
                console.error("Error uploading dragged/pasted image:", error)
                toast.error(`Failed to upload ${file.name}`)
                // Remove node if upload failed
                editor.update(() => {
                  if (nodeKey) {
                    const node = $getNodeByKey(nodeKey!)
                    if ($isImageNode(node)) {
                      node.remove()
                    }
                  }
                })
              }
            }
          }
        })()
        return true
      },
      COMMAND_PRIORITY_LOW
    )
  }, [editor])
  return null
}
