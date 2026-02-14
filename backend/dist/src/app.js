"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const express_api_reference_1 = require("@scalar/express-api-reference");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const postRoutes_1 = __importDefault(require("./routes/postRoutes"));
const envRoutes_1 = __importDefault(require("./routes/envRoutes"));
const mediaRoutes_1 = __importDefault(require("./routes/mediaRoutes"));
const tagRoutes_1 = __importDefault(require("./routes/tagRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("/api/auth", authRoutes_1.default);
app.use("/api/user", userRoutes_1.default);
app.use("/api/posts", postRoutes_1.default);
app.use("/api/envs", envRoutes_1.default);
app.use("/api/media", mediaRoutes_1.default);
app.use("/api/tags", tagRoutes_1.default);
app.use("/api/auth/sign-up/email", (req, res) => {
    res.status(403).json({ error: "Registration is disabled" });
});
const swaggerSpec = (0, swagger_jsdoc_1.default)({
    definition: {
        openapi: "3.1.0",
        info: {
            title: "Express Auto Docs API",
            version: "1.0.0",
        },
    },
    apis: ["./src/routes/*.ts"], // scan komentar di folder ini
});
app.use("/api", (0, express_api_reference_1.apiReference)({
    content: swaggerSpec,
}));
// const staticDir = path.resolve(__dirname, "../..", "frontend", "dist");
// app.use(express.static(staticDir));
// app.use((req, res, next) => {
//     return res.sendFile(path.join(staticDir, "index.html"));
// });
exports.default = app;
