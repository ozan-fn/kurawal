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
exports.getUploadSignature = void 0;
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const prisma_1 = require("../lib/prisma");
// Generate upload signature for direct Cloudinary upload
const getUploadSignature = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { folder = "temp", filename } = req.body;
        if (!filename) {
            res.status(400).json({ error: "filename is required" });
            return;
        }
        const timestamp = Math.round(Date.now() / 1000);
        // Generate random publicId without original filename
        const publicId = `${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
        // Parameters must be sorted alphabetically for Cloudinary signature
        const paramsToSign = {
            folder,
            public_id: publicId,
            timestamp,
        };
        const signature = cloudinary_1.default.utils.api_sign_request(paramsToSign, process.env.CLOUDINARY_API_SECRET);
        const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
        const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`;
        // Full publicId with folder
        const fullPublicId = `${folder}/${publicId}`;
        // Create media record with pending status
        const media = yield prisma_1.prisma.media.create({
            data: {
                publicId: fullPublicId,
                filename,
                status: "PENDING",
            },
        });
        res.status(200).json({
            timestamp,
            signature,
            cloud_name: cloudName,
            api_key: process.env.CLOUDINARY_API_KEY,
            folder,
            cloudinary_url: cloudinaryUrl,
            media_id: media.id,
            public_id: publicId, // Send without folder prefix to client
        });
    }
    catch (error) {
        console.error("Error generating signature:", error);
        res.status(500).json({ error: "Failed to generate signature" });
    }
});
exports.getUploadSignature = getUploadSignature;
