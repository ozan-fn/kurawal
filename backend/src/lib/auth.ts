import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";

export const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_BASE_URL!,
    advanced: {
        disableOriginCheck: process.env.NODE_ENV !== "production",
    },
    emailAndPassword: {
        enabled: true,
        // disableSignUp: process.env.NODE_ENV !== "development",
    },
    database: prismaAdapter(prisma, {
        provider: "mongodb",
    }),
});
