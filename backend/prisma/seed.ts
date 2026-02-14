import { auth } from "../src/lib/auth";

async function main() {
    try {
        console.log("🌱 Starting seed...");

        // Try to sign up admin user
        await auth.api.signUpEmail({
            body: {
                email: "admin@kurawal.com",
                password: "admin123",
                name: "Admin Kurawal",
            },
        });

        console.log("✅ Admin user created successfully");
        console.log("📧 Email: admin@kurawal.com");
        console.log("🔐 Password: admin123");
    } catch (error) {
        console.error("❌ Seed error:", error);
        throw error;
    }
}

main().catch((error) => {
    console.error("Seed error:", error);
    process.exit(1);
});
