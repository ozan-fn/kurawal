"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const better_auth_1 = require("better-auth");
const prisma_1 = require("better-auth/adapters/prisma");
const prisma_2 = require("./prisma");
exports.auth = (0, better_auth_1.betterAuth)({
    baseURL: process.env.BETTER_AUTH_BASE_URL,
    advanced: {
        disableOriginCheck: process.env.NODE_ENV !== "production",
    },
    emailAndPassword: {
        enabled: true,
        // disableSignUp: process.env.NODE_ENV !== "development",
    },
    database: (0, prisma_1.prismaAdapter)(prisma_2.prisma, {
        provider: "mongodb",
    }),
});
