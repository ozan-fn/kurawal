import express, { type Express } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import { toNodeHandler, fromNodeHeaders } from "better-auth/node";
import { auth } from "./lib/auth";

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

app.get("/api", (req, res) => res.json({ hello: "world" }));

// const staticDir = path.resolve(__dirname, "../..", "frontend", "dist");

// app.use(express.static(staticDir));

// app.use((req, res, next) => {
//     return res.sendFile(path.join(staticDir, "index.html"));
// });

export default app;
