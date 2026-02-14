"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFullMedia = exports.linkMultipleMediaToPost = exports.linkMediaToPost = exports.getMediaByPublicId = exports.updateMediaStatus = exports.deleteMediaRecord = exports.deleteMediaFromCloudinary = exports.extractCloudinaryUrlsFromContent = exports.extractPublicIdFromUrl = void 0;
const cloudinary_1 = __importDefault(require("./cloudinary"));
const prisma_1 = require("../lib/prisma");
/**
 * Extract public ID from Cloudinary URL
 * Converts: https://res.cloudinary.com/cloud/image/upload/folder/publicId
 * To: folder/publicId
 */
const extractPublicIdFromUrl = (url) => {
    try {
        const regex = /\/upload\/(.+?)(?:\?|$)/;
        const match = url.match(regex);
        return match ? match[1] : null;
    }
    catch (error) {
        console.error("Error extracting publicId from URL:", error);
        return null;
    }
};
exports.extractPublicIdFromUrl = extractPublicIdFromUrl;
/**
 * Extract all Cloudinary URLs from content
 */
const extractCloudinaryUrlsFromContent = (content) => {
    try {
        const regex = /https:\/\/res\.cloudinary\.com\/[^/]+\/[^/]+\/upload\/[^\s"'<>)]+/g;
        return content.match(regex) || [];
    }
    catch (error) {
        console.error("Error extracting Cloudinary URLs from content:", error);
        return [];
    }
};
exports.extractCloudinaryUrlsFromContent = extractCloudinaryUrlsFromContent;
/**
 * Delete media from Cloudinary
 */
const deleteMediaFromCloudinary = (publicId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Remove file extension if present
        const publicIdClean = publicId.replace(/\.(png|jpe?g|gif|webp|mp4|pdf|svg|bmp|ico|mov|avi|wmv|doc|docx|txt|zip|json|xml|csv)$/i, "");
        console.log("Deleting from Cloudinary:", publicIdClean);
        const result = yield cloudinary_1.default.uploader.destroy(publicIdClean, {
            invalidate: true,
        });
        if (result.result !== "ok" && result.result !== "not found") {
            console.warn("Cloudinary delete warning:", result);
            return false;
        }
        return true;
    }
    catch (error) {
        console.error("Cloudinary delete error:", error);
        return false;
    }
});
exports.deleteMediaFromCloudinary = deleteMediaFromCloudinary;
/**
 * Delete media record from database
 */
const deleteMediaRecord = (publicId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const media = yield prisma_1.prisma.media.findUnique({
            where: { publicId },
        });
        if (!media) {
            console.warn("Media record not found for publicId:", publicId);
            return false;
        }
        yield prisma_1.prisma.media.delete({
            where: { id: media.id },
        });
        return true;
    }
    catch (error) {
        console.error("Error deleting media record:", error);
        return false;
    }
});
exports.deleteMediaRecord = deleteMediaRecord;
/**
 * Update media status and link to post
 * Simple: just update status to ACTIVE and set postId
 */
const updateMediaStatus = (publicId, status, postId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const media = yield prisma_1.prisma.media.findUnique({
            where: { publicId },
        });
        if (!media) {
            console.warn("Media record not found for publicId:", publicId);
            return false;
        }
        const updateData = { status };
        if (postId)
            updateData.postId = postId;
        yield prisma_1.prisma.media.update({
            where: { id: media.id },
            data: updateData,
        });
        return true;
    }
    catch (error) {
        console.error("Error updating media status:", error);
        return false;
    }
});
exports.updateMediaStatus = updateMediaStatus;
/**
 * Fetch media by public ID
 */
const getMediaByPublicId = (publicId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const media = yield prisma_1.prisma.media.findUnique({
            where: { publicId },
        });
        return media;
    }
    catch (error) {
        console.error("Error fetching media by publicId:", error);
        return null;
    }
});
exports.getMediaByPublicId = getMediaByPublicId;
/**
 * Link media to post
 * Simple: just update status to ACTIVE and set postId
 */
const linkMediaToPost = (publicId, postId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const media = yield (0, exports.getMediaByPublicId)(publicId);
        if (!media) {
            console.warn("Media not found, cannot link to post:", publicId);
            return false;
        }
        yield prisma_1.prisma.media.update({
            where: { id: media.id },
            data: {
                status: "ACTIVE",
                postId,
            },
        });
        return true;
    }
    catch (error) {
        console.error("Error linking media to post:", error);
        return false;
    }
});
exports.linkMediaToPost = linkMediaToPost;
/**
 * Link multiple media to post
 * Simple: just validate and update status + postId
 */
const linkMultipleMediaToPost = (publicIds, postId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validPublicIds = [];
        // Validate all exist
        for (const publicId of publicIds) {
            const media = yield (0, exports.getMediaByPublicId)(publicId);
            if (media) {
                validPublicIds.push(publicId);
            }
            else {
                console.warn("Media not found, skipping:", publicId);
            }
        }
        if (validPublicIds.length === 0) {
            console.warn("No valid media found to link to post");
            return 0;
        }
        const result = yield prisma_1.prisma.media.updateMany({
            where: { publicId: { in: validPublicIds } },
            data: {
                status: "ACTIVE",
                postId,
            },
        });
        return result.count;
    }
    catch (error) {
        console.error("Error linking multiple media to post:", error);
        return 0;
    }
});
exports.linkMultipleMediaToPost = linkMultipleMediaToPost;
/**
 * Delete full media (both from Cloudinary and database)
 */
const deleteFullMedia = (publicId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Delete from Cloudinary first
        yield (0, exports.deleteMediaFromCloudinary)(publicId);
        // Then delete from database
        yield (0, exports.deleteMediaRecord)(publicId);
        return true;
    }
    catch (error) {
        console.error("Error deleting full media:", error);
        return false;
    }
});
exports.deleteFullMedia = deleteFullMedia;
