import { Server as SocketIoServer, Socket } from "socket.io";
import http from "http";

const activeSockets: Set<Socket> = new Set();

export function handleWebSocket(socket: Socket) {
	console.log("Client connected:", socket.id);

	activeSockets.add(socket);

	socket.on("message", (message) => {
		for (const activeSocket of activeSockets) {
			if (activeSocket !== socket) {
				activeSocket.send(message);
			}
		}
	});

	socket.on("disconnect", () => {
		console.log("Client disconnected:", socket.id);
		activeSockets.delete(socket);
	});
}


export function setupWebSocket(server: http.Server) {
	const io = new SocketIoServer(server);

	io.on("connection", (socket: Socket) => {
		handleWebSocket(socket);
	});
}
