import "dotenv/config";
import app from "./app";
import mongoose from "mongoose";

const uri: string = process.env.MONGODB_URI!;

(async () => {
    try {
        await mongoose.connect(uri);
        console.log("Connected to the database");
    } catch (error) {
        console.error(error);
    }
})();

const PORT: string | number = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});
