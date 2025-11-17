import express, { type Express } from "express";
import path from "path";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import postRoutes from "./routes/postRoutes";
import envRoutes from "./routes/envRoutes";

const app: Express = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/envs", envRoutes);

app.get("/api", (req, res) => {
    return res.json({
        hello: "world",
    });
});

const staticDir = path.resolve(__dirname, "../..", "frontend", "dist");

app.use(express.static(staticDir));

app.use((req, res, next) => {
    return res.sendFile(path.join(staticDir, "index.html"));
});

export default app;
