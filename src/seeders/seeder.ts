import { PrismaClient } from "@prisma/client";
import { rooms } from "./rooms";

const prisma = new PrismaClient();

const main = async() => {
	try {
		await prisma.chatRoom.createMany({ data: rooms });
	} catch (error) {
		console.error("Seeding failed:", error);
	} finally {
		await prisma.$disconnect();
	}
};

main();