import express from "express";
import http from "http";
import WebSocket from "ws";
import cors from "cors";

const app = express();
app.use(cors());
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
	ws.on("message", (message) => {
		let decodedMessage: string;
		if (Buffer.isBuffer(message)) {
			const decoder = new TextDecoder("utf-8");
			decodedMessage = decoder.decode(message);
		} else {
			decodedMessage = message.toString();
		}

		wss.clients.forEach((client) => {
			if (client !== ws && client.readyState === WebSocket.OPEN) {
				client.send(JSON.stringify(decodedMessage));
			}
		});
	});
});

server.listen(8080, () => {
	console.log("Server started on port 8080");
});
