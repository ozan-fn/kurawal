import { Response } from "express";
import { AuthRequest } from "../middlewares/authMiddleware";
import mongoose from 'mongoose';
import Tags from "../models/Tags";

export const getTags = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        // Ambil query params
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const search = (req.query.search as string) || '';

        // Validasi page & limit biar nggak negative atau terlalu besar
        const pageNum = page < 1 ? 1 : page;
        const limitNum = limit < 1 ? 10 : limit > 100 ? 100 : limit; // max 100 per page

        const skip = (pageNum - 1) * limitNum;

        // Filter berdasarkan search (kalau ada)
        const searchQuery = search
            ? { name: { $regex: search, $options: 'i' } } // case-insensitive
            : {};

        // Query utama dengan pagination
        const tags = await Tags.find(searchQuery)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limitNum)
            .lean(); // .lean() biar lebih cepat (return plain JS object)

        // Hitung total data untuk pagination info
        const totalTags = await Tags.countDocuments(searchQuery);

        const totalPages = Math.ceil(totalTags / limitNum);

        // Response lengkap biar frontend gampang
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
            search, // biar frontend tau lagi search apa
        });

    } catch (error: any) {
        console.error('Error fetching tags:', error);
        res.status(500).json({
            success: false,
            message: 'Gagal mengambil data tags',
            error: error.message,
        });
    }
};

export const getTag = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const tags = await Tags.findById(id);
        if (!tags) {
            return res.status(404).json({ message: "Tag not found" });
        }
        res.json(tags);
    } catch (error) {
        console.error("Error fetching tags:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const createTag = async (req: AuthRequest, res: Response) => {
    try {
        const { tag_name } = req.body;  
        if (!tag_name || typeof tag_name !== 'string' || tag_name.trim() === '') {
            return res.status(400).json({ message: "Tag name is required and must be a non-empty string" });
        }
        const tagSlug = tag_name.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''); // Clean slug
        // Cek apakah tag udah ada (unique by slug)
        let existingTag = await Tags.findOne({ tag_slug: tagSlug });
        if (existingTag) {
            return res.status(400).json({ message: "Tag already exists" });
        }       
        const newTag = new Tags({
            tag_name: tag_name.trim(),
            tag_slug: tagSlug
        });
        const savedTag = await newTag.save();
        res.status(201).json(savedTag);
    } catch (error) {
        console.error("Error creating tag:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const updateTag = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const { tag_name } = req.body;
        if (!tag_name || typeof tag_name !== 'string' || tag_name.trim() === '') {
            return res.status(400).json({ message: "Tag name is required and must be a non-empty string" });
        }
        const tagSlug = tag_name.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''); // Clean slug
        const updatedTag = await Tags.findByIdAndUpdate(
            id,
            { tag_name: tag_name.trim(), tag_slug: tagSlug },
            { new: true }
        );  
        if (!updatedTag) {
            return res.status(404).json({ message: "Tag not found" });
        }
        res.json(updatedTag);
    } catch (error) {
        console.error("Error updating tag:", error);
        res.status(500).json({ message: "Server error" });
    }   
};

export const deleteTag = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const deletedTag = await Tags.findByIdAndDelete(id);
        if (!deletedTag) {
            return res.status(404).json({ message: "Tag not found" });
        }
        res.json({ message: "Tag deleted successfully" });
    } catch (error) {
        console.error("Error deleting tag:", error);
        res.status(500).json({ message: "Server error" });
    }   
};