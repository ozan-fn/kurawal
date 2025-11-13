import express, { type Express } from "express";
import path from "path";
import { connectDB } from "./middlewares/databaseMiddleware";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import postRoutes from "./routes/postRoutes";

const app: Express = express();

app.use(express.json());
app.use(connectDB);

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/posts", postRoutes);

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
