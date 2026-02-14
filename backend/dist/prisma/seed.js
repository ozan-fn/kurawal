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
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("../src/lib/auth");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("🌱 Starting seed...");
            // Try to sign up admin user
            yield auth_1.auth.api.signUpEmail({
                body: {
                    email: "admin@kurawal.com",
                    password: "admin123",
                    name: "Admin Kurawal",
                },
            });
            console.log("✅ Admin user created successfully");
            console.log("📧 Email: admin@kurawal.com");
            console.log("🔐 Password: admin123");
        }
        catch (error) {
            console.error("❌ Seed error:", error);
            throw error;
        }
    });
}
main().catch((error) => {
    console.error("Seed error:", error);
    process.exit(1);
});
