import { Request, Response } from "express";
import cloudinary from "../utils/cloudinary";
import { config } from "dotenv";
import Media, { IMedia } from "../models/Media";

config(); // Load environment variables

interface GetUploadSignatureRequest extends Request {
    body: {
        folder?: string;
        public_id?: string;
        status?: string;
    };
}

export const getUploadSignature = async (req: GetUploadSignatureRequest, res: Response): Promise<void> => {
    try {
        var { folder, public_id, status } = req.body;

        console.log(req.body);
        const timestamp = Math.floor(Date.now() / 1000);

        const paramsToSign = {
            timestamp,
            ...(folder && { folder }),
            ...(public_id && { public_id }),
        };

        const signature = cloudinary.utils.api_sign_request(
            paramsToSign,
            process.env.CLOUDINARY_API_SECRET as string
        );

        const media = new Media({
            publicId: folder+'/'+public_id || "",
            status: status || "pending",
            filename: public_id || "",
        });
        await media.save();

        res.status(200).json({
            timestamp,
            signature,
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            ...(folder && { folder }),
            ...(public_id && { public_id }),
        });
    } catch (error) {
        console.error('Error generating signature:', error);
        res.status(500).json({ error: 'Gagal generate signature' });
    }
};

export const getListMedia = async (req: Request, res: Response): Promise<void> => {
    try {
        const page = Math.max(1, parseInt(req.query.page as string) || 1);
        const limit = Math.min(100, parseInt(req.query.limit as string) || 10);
        const skip = (page - 1) * limit;

        const media : IMedia[] = await Media.find({}).sort({ createdAt: -1 }).skip(skip).limit(limit);
        const totalMedia = await Media.countDocuments({});
        const totalPages = Math.ceil(totalMedia / limit);
        const hasNextPage = page < totalPages;
        const hasPrevPage = page > 1;

        const mediaList = {
            media,
            pagination: {   
                totalItems: totalMedia,
                totalPages,
                currentPage: page,
                hasNextPage,
                hasPrevPage,
            },
        };


        res.status(200).json(mediaList);
    } catch (error) {   
        console.error('Error fetching media list:', error);
        res.status(500).json({ error: 'Gagal mengambil daftar media' });
    }
};

export const deleteMedia = async (req: Request, res: Response): Promise<void> => {
    try {
        const { public_id } = req.query;

        if (!public_id || typeof public_id !== 'string') {
            res.status(400).json({ error: 'public_id diperlukan' });
            return;
        }

        // Hapus ekstensi .png, .jpg, dll kalau ada
        const publicIdClean = public_id.replace(/\.(png|jpe?g|gif|webp|mp4|pdf|svg|bmp)$/i, '');

        console.log('Menghapus dari Cloudinary:', publicIdClean);

        // Sekarang cloudinary.uploader sudah ADA karena sudah di-config di file utils
        const result = await cloudinary.uploader.destroy(publicIdClean, {
            invalidate: true,        // optional: bersihin cache CDN
            // resource_type: 'image' // tambahkan kalau video/raw: 'video' atau 'raw'
        });

        if (result.result === 'not found') {
            console.warn('File tidak ada di Cloudinary, tetap hapus dari DB');
        } else if (result.result !== 'ok') {
            res.status(400).json({ error: 'Gagal hapus dari Cloudinary', details: result });
            return;
        }

        // Hapus dari database
        const deleted = await Media.findOneAndDelete({ publicId: public_id });
        if (!deleted) {
            res.status(404).json({ error: 'Data tidak ditemukan di database' });
            return;
        }

        res.json({ message: 'Media berhasil dihapus dari Cloudinary & database!' });

    } catch (error: any) {
        console.error('Error delete media:', error);
        res.status(500).json({ error: 'Server error', details: error.message });
    }
};