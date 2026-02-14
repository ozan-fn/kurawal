import express, { type Express } from "express";
import cookieParser from "cookie-parser";
import swaggerJSDoc from "swagger-jsdoc";
import { apiReference } from "@scalar/express-api-reference";

import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import postRoutes from "./routes/postRoutes";
import envRoutes from "./routes/envRoutes";
import mediaRoutes from "./routes/mediaRoutes";
import tagRoutes from "./routes/tagRoutes";
import path from "path";

const app: Express = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/envs", envRoutes);
app.use("/api/media", mediaRoutes);
app.use("/api/tags", tagRoutes);

app.use("/api/auth/sign-up/email", (req, res) => {
    res.status(403).json({ error: "Registration is disabled" });
});

const swaggerSpec = swaggerJSDoc({
    definition: {
        openapi: "3.1.0",
        info: {
            title: "Express Auto Docs API",
            version: "1.0.0",
        },
    },
    apis: ["./src/routes/*.ts"], // scan komentar di folder ini
});

app.use(
    "/api",
    apiReference({
        content: swaggerSpec,
    }),
);

const staticDir = path.resolve(__dirname, "../..", "frontend", "dist");

app.use(express.static(staticDir));

app.use((req, res, next) => {
    return res.sendFile(path.join(staticDir, "index.html"));
});

export default app;
