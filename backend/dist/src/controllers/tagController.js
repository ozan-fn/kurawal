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
exports.deleteTag = exports.updateTag = exports.createTag = exports.getTag = exports.getTags = void 0;
const prisma_1 = require("../lib/prisma");
const getTags = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || "";
        const pageNum = page < 1 ? 1 : page;
        const limitNum = limit < 1 ? 10 : limit > 100 ? 100 : limit;
        const skip = (pageNum - 1) * limitNum;
        const where = search
            ? {
                name: {
                    contains: search,
                    mode: "insensitive",
                },
            }
            : {};
        const [tags, totalTags] = yield Promise.all([
            prisma_1.prisma.tag.findMany({
                where,
                orderBy: { createdAt: "desc" },
                skip,
                take: limitNum,
            }),
            prisma_1.prisma.tag.count({ where }),
        ]);
        const totalPages = Math.ceil(totalTags / limitNum);
        res.json({
            success: true,
            data: tags,
            pagination: {
                currentPage: pageNum,
                totalPages,
                totalItems: totalTags,
                itemsPerPage: limitNum,
                hasNextPage: pageNum < totalPages,
                hasPrevPage: pageNum > 1,
            },
            search,
        });
    }
    catch (error) {
        console.error("Error fetching tags:", error);
        res.status(500).json({
            success: false,
            message: "Gagal mengambil data tags",
            error: error.message,
        });
    }
});
exports.getTags = getTags;
const getTag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const tag = yield prisma_1.prisma.tag.findUnique({
            where: { id },
        });
        if (!tag) {
            return res.status(404).json({ message: "Tag not found" });
        }
        res.json(tag);
    }
    catch (error) {
        console.error("Error fetching tags:", error);
        res.status(500).json({ message: "Server error" });
    }
});
exports.getTag = getTag;
const createTag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, slug } = req.body;
        if (!name || typeof name !== "string" || name.trim() === "") {
            return res.status(400).json({ message: "Tag name is required and must be a non-empty string" });
        }
        const normalizedSlug = typeof slug === "string" && slug.trim() !== ""
            ? slug
            : name
                .toLowerCase()
                .trim()
                .replace(/\s+/g, "-")
                .replace(/[^a-z0-9-]/g, "");
        const existingTag = yield prisma_1.prisma.tag.findUnique({
            where: { slug: normalizedSlug },
        });
        if (existingTag) {
            return res.status(400).json({ message: "Tag already exists" });
        }
        const newTag = yield prisma_1.prisma.tag.create({
            data: {
                name: name.trim(),
                slug: normalizedSlug,
            },
        });
        res.status(201).json(newTag);
    }
    catch (error) {
        console.error("Error creating tag:", error);
        res.status(500).json({ message: "Server error" });
    }
});
exports.createTag = createTag;
const updateTag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { name, slug } = req.body;
        if ((name === undefined || name === null) && (slug === undefined || slug === null)) {
            return res.status(400).json({ message: "At least one field must be provided" });
        }
        const existingTag = yield prisma_1.prisma.tag.findUnique({
            where: { id },
        });
        if (!existingTag) {
            return res.status(404).json({ message: "Tag not found" });
        }
        const newName = typeof name === "string" ? name.trim() : existingTag.name;
        const newSlug = typeof slug === "string" && slug.trim() !== ""
            ? slug
            : typeof name === "string" && name.trim() !== ""
                ? name
                    .toLowerCase()
                    .trim()
                    .replace(/\s+/g, "-")
                    .replace(/[^a-z0-9-]/g, "")
                : existingTag.slug;
        if (newSlug !== existingTag.slug) {
            const slugExists = yield prisma_1.prisma.tag.findUnique({
                where: { slug: newSlug },
            });
            if (slugExists) {
                return res.status(400).json({ message: "Slug already exists" });
            }
        }
        const updatedTag = yield prisma_1.prisma.tag.update({
            where: { id },
            data: {
                name: newName,
                slug: newSlug,
            },
        });
        res.json(updatedTag);
    }
    catch (error) {
        console.error("Error updating tag:", error);
        res.status(500).json({ message: "Server error" });
    }
});
exports.updateTag = updateTag;
const deleteTag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield prisma_1.prisma.tag.delete({
            where: { id },
        });
        res.json({ message: "Tag deleted successfully" });
    }
    catch (error) {
        if (error.code === "P2025") {
            return res.status(404).json({ message: "Tag not found" });
        }
        console.error("Error deleting tag:", error);
        res.status(500).json({ message: "Server error" });
    }
});
exports.deleteTag = deleteTag;
