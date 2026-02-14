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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.updatePost = exports.createPost = exports.getPost = exports.getPosts = void 0;
const prisma_1 = require("../lib/prisma");
const mediaHelpers_1 = require("../utils/mediaHelpers");
const getPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = Math.max(1, parseInt(req.query.page) || 1);
        const limit = Math.min(50, Math.max(1, parseInt(req.query.limit) || 10));
        const skip = (page - 1) * limit;
        const search = req.query.search || "";
        const tagId = req.query.tagId || "";
        const where = {};
        if (search) {
            where.OR = [{ title: { contains: search, mode: "insensitive" } }, { description: { contains: search, mode: "insensitive" } }];
        }
        if (tagId) {
            where.tagId = tagId;
        }
        const [posts, totalPosts] = yield Promise.all([
            prisma_1.prisma.post.findMany({
                where,
                orderBy: { createdAt: "desc" },
                skip,
                take: limit,
            }),
            prisma_1.prisma.post.count({ where }),
        ]);
        const totalPages = Math.ceil(totalPosts / limit);
        res.json({
            success: true,
            data: posts,
            pagination: {
                currentPage: page,
                totalPages,
                totalItems: totalPosts,
                itemsPerPage: limit,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1,
            },
            filters: {
                search: search || null,
                tagId: tagId || null,
            },
        });
    }
    catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch posts",
            error: error.message,
        });
    }
});
exports.getPosts = getPosts;
const getPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const post = yield prisma_1.prisma.post.findUnique({
            where: { id },
        });
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.json(post);
    }
    catch (error) {
        console.error("Error fetching post:", error);
        res.status(500).json({ message: "Server error" });
    }
});
exports.getPost = getPost;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, type_post, content, link_github, thumbnail, tagId, status } = req.body;
        if (!title || !content || !tagId) {
            return res.status(400).json({ message: "title, content, and tagId are required" });
        }
        if (type_post && !["POST", "PROJECT"].includes(type_post)) {
            return res.status(400).json({ message: "type_post must be POST or PROJECT" });
        }
        if (status && !["DRAFT", "PUBLISHED", "ARCHIVED"].includes(status)) {
            return res.status(400).json({ message: "status must be DRAFT, PUBLISHED, or ARCHIVED" });
        }
        const existingTag = yield prisma_1.prisma.tag.findUnique({
            where: { id: tagId },
        });
        if (!existingTag) {
            return res.status(400).json({ message: "Tag not found" });
        }
        const post = yield prisma_1.prisma.post.create({
            data: {
                title,
                content,
                tagId,
                userId: req.user.id,
                description: description !== null && description !== void 0 ? description : null,
                link_github: link_github !== null && link_github !== void 0 ? link_github : null,
                thumbnail: thumbnail !== null && thumbnail !== void 0 ? thumbnail : null,
                type_post: type_post !== null && type_post !== void 0 ? type_post : "POST",
                status: status !== null && status !== void 0 ? status : "DRAFT",
            },
        });
        // Collect all media public IDs from thumbnail and content
        const publicIds = new Set();
        if (thumbnail) {
            const publicId = (0, mediaHelpers_1.extractPublicIdFromUrl)(thumbnail);
            if (publicId) {
                publicIds.add(publicId);
            }
        }
        const contentUrls = (0, mediaHelpers_1.extractCloudinaryUrlsFromContent)(content);
        for (const url of contentUrls) {
            const publicId = (0, mediaHelpers_1.extractPublicIdFromUrl)(url);
            if (publicId) {
                publicIds.add(publicId);
            }
        }
        // Link media to post
        if (publicIds.size > 0) {
            const linkedCount = yield (0, mediaHelpers_1.linkMultipleMediaToPost)(Array.from(publicIds), post.id);
            console.log(`Linked ${linkedCount} media to post ${post.id}`);
        }
        res.status(201).json(post);
    }
    catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ message: "Server error" });
    }
});
exports.createPost = createPost;
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { title, description, type_post, content, link_github, thumbnail, tagId, status } = req.body;
        const post = yield prisma_1.prisma.post.findUnique({
            where: { id },
        });
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        if (post.userId !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized: You can only edit your own posts" });
        }
        if (type_post !== undefined && !["POST", "PROJECT"].includes(type_post)) {
            return res.status(400).json({ message: "type_post must be POST or PROJECT" });
        }
        if (status !== undefined && !["DRAFT", "PUBLISHED", "ARCHIVED"].includes(status)) {
            return res.status(400).json({ message: "status must be DRAFT, PUBLISHED, or ARCHIVED" });
        }
        if (tagId !== undefined) {
            const tag = yield prisma_1.prisma.tag.findUnique({
                where: { id: tagId },
            });
            if (!tag) {
                return res.status(400).json({ message: "Tag not found" });
            }
        }
        if (thumbnail !== undefined && thumbnail !== post.thumbnail) {
            if (post.thumbnail) {
                const oldPublicId = (0, mediaHelpers_1.extractPublicIdFromUrl)(post.thumbnail);
                if (oldPublicId) {
                    yield (0, mediaHelpers_1.deleteFullMedia)(oldPublicId);
                }
            }
            if (thumbnail) {
                const newPublicId = (0, mediaHelpers_1.extractPublicIdFromUrl)(thumbnail);
                if (newPublicId) {
                    // Link media to post
                    yield (0, mediaHelpers_1.linkMediaToPost)(newPublicId, post.id);
                }
            }
        }
        if (content !== undefined && content !== post.content) {
            const oldUrls = (0, mediaHelpers_1.extractCloudinaryUrlsFromContent)(post.content);
            const newUrls = (0, mediaHelpers_1.extractCloudinaryUrlsFromContent)(content);
            const removedUrls = oldUrls.filter((url) => !newUrls.includes(url));
            for (const url of removedUrls) {
                const publicId = (0, mediaHelpers_1.extractPublicIdFromUrl)(url);
                if (publicId) {
                    yield (0, mediaHelpers_1.deleteFullMedia)(publicId);
                }
            }
            const addedUrls = newUrls.filter((url) => !oldUrls.includes(url));
            const addedPublicIds = addedUrls.map((url) => (0, mediaHelpers_1.extractPublicIdFromUrl)(url)).filter((publicId) => Boolean(publicId));
            if (addedPublicIds.length > 0) {
                // Link media to post
                const linkedCount = yield (0, mediaHelpers_1.linkMultipleMediaToPost)(addedPublicIds, post.id);
                console.log(`Linked ${linkedCount} additional media to post ${post.id}`);
            }
        }
        const updateData = {};
        if (title !== undefined)
            updateData.title = title;
        if (description !== undefined)
            updateData.description = description;
        if (type_post !== undefined)
            updateData.type_post = type_post;
        if (content !== undefined)
            updateData.content = content;
        if (link_github !== undefined)
            updateData.link_github = link_github;
        if (thumbnail !== undefined)
            updateData.thumbnail = thumbnail;
        if (tagId !== undefined)
            updateData.tagId = tagId;
        if (status !== undefined)
            updateData.status = status;
        const updatedPost = yield prisma_1.prisma.post.update({
            where: { id },
            data: updateData,
        });
        res.json(updatedPost);
    }
    catch (error) {
        console.error("Error updating post:", error);
        res.status(500).json({ message: "Server error" });
    }
});
exports.updatePost = updatePost;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const post = yield prisma_1.prisma.post.findUnique({
            where: { id },
        });
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        if (post.userId !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized: You can only delete your own posts" });
        }
        if (post.thumbnail) {
            const publicId = (0, mediaHelpers_1.extractPublicIdFromUrl)(post.thumbnail);
            if (publicId) {
                yield (0, mediaHelpers_1.deleteFullMedia)(publicId);
            }
        }
        const contentUrls = (0, mediaHelpers_1.extractCloudinaryUrlsFromContent)(post.content);
        for (const url of contentUrls) {
            const publicId = (0, mediaHelpers_1.extractPublicIdFromUrl)(url);
            if (publicId) {
                yield (0, mediaHelpers_1.deleteFullMedia)(publicId);
            }
        }
        yield prisma_1.prisma.post.delete({
            where: { id },
        });
        res.json({ message: "Post deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting post:", error);
        res.status(500).json({ message: "Server error" });
    }
});
exports.deletePost = deletePost;
