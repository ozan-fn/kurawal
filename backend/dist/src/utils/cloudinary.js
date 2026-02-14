"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// utils/cloudinary.ts
const cloudinary_1 = require("cloudinary");
// Konfigurasi sekali di sini, langsung diekspor
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
// Ekspor instance yang sudah di-config
exports.default = cloudinary_1.v2;
