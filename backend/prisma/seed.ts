import bcrypt from "bcryptjs";
import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient();

async function main() {
    try {
        console.log("🌱 Starting seed...");

        const hashedPassword = await bcrypt.hash("admin123", 10);

        const user = await prisma.user.create({
            data: {
                email: "admin@kurawal.com",
                name: "Admin Kurawal",
                password: hashedPassword,
            },
        });

        console.log("✅ Admin user created successfully");
        console.log("📧 Email: admin@kurawal.com");
        console.log("🔐 Password: admin123");
        console.log("👤 User ID:", user.id);
    } catch (error) {
        console.error("❌ Seed error:", error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

main().catch((error) => {
    console.error("Seed error:", error);
    process.exit(1);
});
