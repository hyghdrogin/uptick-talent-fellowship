/* eslint-disable @typescript-eslint/no-namespace */
import express, { Request, Response, Router } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { GeneralRequest } from "./utils";
import http from "http";
import path from "path";
import { setupWebSocket } from "./websocket";

declare global {
	namespace Express {
	interface Request extends GeneralRequest {}
	}
}

export const server = (
	port: string | number,
	router: Router,
	baseUrl = "/"
) => {
	const app = express();
  
	app.use(cors());
	app.use(bodyParser.json({ limit: "50mb" }));
	app.use(express.json({ limit: "50mb" }));
	app.use(express.urlencoded({ extended: false, limit: "50mb" }));
	app.use(express.static(path.join(__dirname, "../public")));
  
	app.get(baseUrl, (req: Request, res: Response) => {
		res.clearCookie("username", { httpOnly: true });
		res.sendFile(path.join(__dirname, "../public", "index.html"));
	});
  
	app.use(baseUrl, router);
  
	app.use((req: Request, res: Response) => {
		res.sendFile(path.join(__dirname, "../public", "404.html"));
	});
  
	const httpServer = http.createServer(app);
	setupWebSocket(httpServer);
  
	httpServer.listen(port, async () => {
		console.info(`Listening on port ${port}`);
	});
};
  