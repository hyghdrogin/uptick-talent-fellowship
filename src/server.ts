import { createServer } from "http";
import { Server } from "socket.io";

const server = createServer();
const io: Server = new Server(server);

const chatRooms = new Map<string, Set<string>>();

io.on("connection", (socket) => {
	const joinRoom = (room: string) => {
		socket.join(room);
		if (!chatRooms.has(room)) {
			chatRooms.set(room, new Set());
		}
    chatRooms.get(room)!.add(socket.id);
	};

	socket.on("message", (data) => {
		const { room, message } = data;

		if (room) {
			joinRoom(room);
		}

		const chatRoom = chatRooms.get(room || "default");
		if (chatRoom !== undefined) {
			const chatRoomArray = Array.from(chatRoom);
			io.to(chatRoomArray).emit("message", {
				user: socket.id,
				message,
			});
		}
	});

	socket.on("disconnect", () => {
		const room = [...socket.rooms][1]; 
		if (room) {
			const chatRoom = chatRooms.get(room);
			if (chatRoom) {
				chatRoom.delete(socket.id);
				if (chatRoom.size === 0) {
					chatRooms.delete(room);
				}
			}
		}
	});
});

server.listen(3000, () => {
	console.log("Server is running on port 3000");
});
