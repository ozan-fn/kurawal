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
exports.deleteEnv = exports.updateEnv = exports.createEnv = exports.getEnv = exports.getEnvs = void 0;
const Env_1 = __importDefault(require("../models/Env"));
const validator_1 = __importDefault(require("validator"));
const getEnvs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Ambil query params untuk pagination
        const page = Math.max(1, parseInt(req.query.page) || 1); // Default page 1, minimal 1
        const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 10)); // Default 10, max 100
        // Hitung skip
        const skip = (page - 1) * limit;
        // Query: Find dengan pagination + sort default (terbaru dulu)
        // Hapus .lean() buat fix type error
        const envs = yield Env_1.default.find({})
            .sort({ createdAt: -1 }) // Best practice: Sort konsisten
            .skip(skip)
            .limit(limit);
        // Hitung total items (efisien, tanpa load semua data)
        const totalItems = yield Env_1.default.countDocuments({});
        // Hitung pagination metadata
        const totalPages = Math.ceil(totalItems / limit);
        const hasNextPage = page < totalPages;
        const hasPrevPage = page > 1;
        res.status(200).json({
            message: "Envs fetched successfully",
            data: envs,
            pagination: {
                currentPage: page,
                totalPages,
                totalItems,
                limit,
                hasNextPage,
                hasPrevPage
            }
        });
    }
    catch (errror) {
        console.error("Error fetching envs:", errror);
        res.status(500).json({ message: "Server error" });
    }
});
exports.getEnvs = getEnvs;
const getEnv = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // Validasi: ID wajib
        if (!id) {
            return res.status(400).json({
                message: "Env ID is required"
            });
        }
        const env = yield Env_1.default.findById(id);
        if (!env) {
            return res.status(404).json({
                message: "Env not found"
            });
        }
        res.status(200).json({
            message: "Env fetched successfully",
            data: env
        });
    }
    catch (error) {
        console.error("Error fetching env:", error);
        res.status(500).json({ message: "Server error" });
    }
});
exports.getEnv = getEnv;
const createEnv = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, link_github, env: envArray } = req.body;
        // Validasi: Semua field wajib
        if (!title || !description || !link_github || !envArray || !Array.isArray(envArray) || envArray.length === 0) {
            return res.status(400).json({
                message: "All fields are required, including at least one env variable in array format"
            });
        }
        // Validasi length: title max 100, description max 500
        if (title.trim().length > 100) {
            return res.status(400).json({
                message: "Title must be at most 100 characters"
            });
        }
        if (description.trim().length > 500) {
            return res.status(400).json({
                message: "Description must be at most 500 characters"
            });
        }
        // Validasi URL untuk link_github
        if (!validator_1.default.isURL(link_github.trim(), { require_protocol: true })) {
            return res.status(400).json({
                message: "link_github must be a valid URL"
            });
        }
        // Validasi struktur env array: Tiap item harus punya key & value
        for (const item of envArray) {
            if (!item.key || typeof item.key !== "string" || !item.value || typeof item.value !== "string" || !item.env_description || typeof item.env_description !== "string") {
                return res.status(400).json({
                    message: "Each env item must have 'key' (string), 'value' (string), and 'env_description' (string)"
                });
            }
            // Validasi length key max 50
            if (item.key.trim().length > 50) {
                return res.status(400).json({
                    message: "Each env key must be at most 50 characters"
                });
            }
        }
        // Cek duplikat key di env array
        const keys = envArray.map((item) => item.key);
        const uniqueKeys = new Set(keys);
        if (uniqueKeys.size !== keys.length) {
            return res.status(400).json({
                message: "Env keys must be unique within the array"
            });
        }
        // Cek duplikat title (sebelum save)
        const existingEnv = yield Env_1.default.findOne({ title: title.trim() });
        if (existingEnv) {
            return res.status(409).json({
                message: `Environment with title '${title}' already exists`
            });
        }
        const environment = new Env_1.default({
            title: title.trim(),
            description: description.trim(),
            link_github: link_github.trim(),
            env: envArray.map((item) => {
                var _a, _b;
                return ({
                    key: item.key.trim(),
                    value: item.value.trim(),
                    env_description: item.env_description.trim(),
                    optional: (_a = item.optional) !== null && _a !== void 0 ? _a : false, // Default false
                    sensitive: (_b = item.sensitive) !== null && _b !== void 0 ? _b : false // Default false
                });
            })
        });
        const savedEnv = yield environment.save();
        res.status(201).json(savedEnv);
    }
    catch (error) {
        console.error("Error creating env:", error);
        res.status(500).json({ message: "Server error" });
    }
});
exports.createEnv = createEnv;
const updateEnv = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title, description, link_github, env: envArray } = req.body;
        // Validasi: ID wajib
        if (!id) {
            return res.status(400).json({
                message: "Env ID is required"
            });
        }
        // Validasi: Minimal satu field untuk update
        if (!title && !description && !link_github && (!envArray || envArray.length === 0)) {
            return res.status(400).json({
                message: "At least one field must be provided for update"
            });
        }
        // Cek existence
        const existingEnv = yield Env_1.default.findById(id);
        if (!existingEnv) {
            return res.status(404).json({
                message: "Env not found"
            });
        }
        // Kalau ada title, validasi length dan duplikat
        if (title !== undefined) {
            if (title.trim().length > 100) {
                return res.status(400).json({
                    message: "Title must be at most 100 characters"
                });
            }
            if (title.trim() !== existingEnv.title) {
                const duplicate = yield Env_1.default.findOne({ title: title.trim() });
                if (duplicate) {
                    return res.status(409).json({
                        message: `Environment with title '${title}' already exists`
                    });
                }
            }
        }
        // Kalau ada description, validasi length
        if (description !== undefined) {
            if (description.trim().length > 500) {
                return res.status(400).json({
                    message: "Description must be at most 500 characters"
                });
            }
        }
        // Kalau ada link_github, validasi URL
        if (link_github !== undefined) {
            if (!validator_1.default.isURL(link_github.trim(), { require_protocol: true })) {
                return res.status(400).json({
                    message: "link_github must be a valid URL"
                });
            }
        }
        // Kalau ada envArray, validasi struktur dan duplikat
        if (envArray !== undefined) {
            if (!Array.isArray(envArray) || envArray.length === 0) {
                return res.status(400).json({
                    message: "Env array must be non-empty if provided"
                });
            }
            for (const item of envArray) {
                if (!item.key || typeof item.key !== "string" || !item.value || typeof item.value !== "string" || !item.env_description || typeof item.env_description !== "string") {
                    return res.status(400).json({
                        message: "Each env item must have 'key' (string), 'value' (string), and 'env_description' (string)"
                    });
                }
                if (item.key.trim().length > 50) {
                    return res.status(400).json({
                        message: "Each env key must be at most 50 characters"
                    });
                }
            }
            const keys = envArray.map((item) => item.key);
            const uniqueKeys = new Set(keys);
            if (uniqueKeys.size !== keys.length) {
                return res.status(400).json({
                    message: "Env keys must be unique within the array"
                });
            }
        }
        // Update fields yang ada
        const updateData = {};
        if (title !== undefined)
            updateData.title = title.trim();
        if (description !== undefined)
            updateData.description = description.trim();
        if (link_github !== undefined)
            updateData.link_github = link_github.trim();
        if (envArray !== undefined) {
            updateData.env = envArray.map((item) => {
                var _a, _b;
                return ({
                    key: item.key.trim(),
                    value: item.value.trim(),
                    env_description: item.env_description.trim(),
                    optional: (_a = item.optional) !== null && _a !== void 0 ? _a : false,
                    sensitive: (_b = item.sensitive) !== null && _b !== void 0 ? _b : false
                });
            });
        }
        const updatedEnv = yield Env_1.default.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
        res.status(200).json({
            message: "Env updated successfully",
            data: updatedEnv
        });
    }
    catch (error) {
        console.error("Error updating env:", error);
        res.status(500).json({ message: "Server error" });
    }
});
exports.updateEnv = updateEnv;
const deleteEnv = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // Validasi: ID wajib
        if (!id) {
            return res.status(400).json({
                message: "Env ID is required"
            });
        }
        const deletedEnv = yield Env_1.default.findByIdAndDelete(id);
        if (!deletedEnv) {
            return res.status(404).json({
                message: "Env not found"
            });
        }
        res.status(200).json({
            message: "Env deleted successfully",
            data: { id: deletedEnv._id, title: deletedEnv.title }
        });
    }
    catch (error) {
        console.error("Error deleting env:", error);
        res.status(500).json({ message: "Server error" });
    }
});
exports.deleteEnv = deleteEnv;
