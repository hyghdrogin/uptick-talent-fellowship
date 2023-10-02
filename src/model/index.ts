import { PrismaClient } from "@prisma/client";

export const db = new PrismaClient({
	// scripts to be loaded to/from database
});