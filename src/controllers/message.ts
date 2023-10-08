import { Socket } from "socket.io";
import { db } from "../models";
import { response } from "../utils";

export const initMessageSocket = async (socket: Socket) => {
	try {
		socket.on("connection", () => {
			// Assuming you will receive the user data as a JSON string during connection
			const user = JSON.parse(socket.handshake.query);

			socket.on("sendMessage", async (message) => {
				try {
					const userData = await db.user.findUnique({
						where: { name: user.name },
						include: { chatRoom: true },
					});

					if (!userData) {
						return response.errorMessage(socket, 404, "User not found");
					}

					const newMessage = await db.message.create({
						data: {
							content: message,
							senderId: user.id,
							chatRoomId: userData.chatRoom?.id,
						},
					});

					socket.emit("messageSent", newMessage);

					// Broadcast the new message to all connected sockets in the chat room
					socket.to(newMessage.chatRoomId!.toString()).emit("newMessage", newMessage);
				} catch (error: unknown) {
					return response.errorMessage(socket, 409, "Error creating message: " + (error as Error).message);
				}
			});
		});
	} catch (error: unknown) {
		console.error("WebSocket error:", error);
		// Handle errors specific to WebSocket
	}
};
