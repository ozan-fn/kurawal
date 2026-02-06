import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";

export const auth = betterAuth({
    advanced: {
        disableOriginCheck: process.env.NODE_ENV !== "production",
    },
    emailAndPassword: {
        enabled: true,
    },
    database: prismaAdapter(prisma, {
        provider: "mongodb",
    }),
});
