// use script to test queries
import "dotenv/config";
import { PrismaClient } from "@prisma/client";

export const db = new PrismaClient({
	// log: ["query"],
});

export * from "@prisma/client";
