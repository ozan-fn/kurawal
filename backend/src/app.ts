import express, { type Express } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import { toNodeHandler, fromNodeHeaders } from "better-auth/node";
import { auth } from "./lib/auth";
import swaggerJSDoc from "swagger-jsdoc";

import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import postRoutes from "./routes/postRoutes";
import envRoutes from "./routes/envRoutes";
import mediaRoutes from "./routes/mediaRoutes";
import tagRoutes from "./routes/tagRoutes";

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

let scalarApiHandler: ReturnType<typeof import("@scalar/express-api-reference").apiReference> | null = null;

app.use("/api", async (req, res, next) => {
    try {
        if (!scalarApiHandler) {
            const { apiReference } = await import("@scalar/express-api-reference");
            scalarApiHandler = apiReference({
                content: swaggerSpec,
            });
        }
        return scalarApiHandler(req, res);
    } catch (error) {
        return next(error);
    }
});

// const staticDir = path.resolve(__dirname, "../..", "frontend", "dist");

// app.use(express.static(staticDir));

// app.use((req, res, next) => {
//     return res.sendFile(path.join(staticDir, "index.html"));
// });

export default app;
