import { io, Socket as ClientSocket } from "socket.io-client";

const socket: ClientSocket = io("http://localhost:3000");

const joinRoom = (room: string) => {
	socket.emit("message", { room, message: "join" });
};

socket.on("connect", () => {
	console.log("Connected to server");
	joinRoom("default");
});

socket.on("message", (message) => {
	console.log("Received message:", message);
});

const sendMessage = (room: string, message: string) => {
	socket.emit("message", { room, message });
};

sendMessage("default", "Hello, world!");
