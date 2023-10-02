import express, { Request, Response, Router } from "express";
import cors from "cors";
import bodyParser from "body-parser";

export const server = (
	port: number | string,
	router: Router,
	baseUrl = "/"
) => {
	const app = express();

	app.use(cors());
	app.use(bodyParser.json({ limit: "50mb" }));
	app.use(express.json({ limit: "50mb" }));
	app.use(express.urlencoded({ extended: false, limit: "50mb" }));

	app.get("/", (req: Request, res: Response) => {
		res.status(200).send({ success: true, message: "API homepage" });
	});
  

	app.use(baseUrl, router);
  
	app.use((req, res) => {
		res.status(404).send({ success: false, message: "invalid Route" });
	});

	app.use((_req: Request, res: Response) => {
		res.status(404).send({ success: false, message: "Invalid route" });
	});
  
	app.listen(port, async () => {
		console.info(`Listening on port ${port}`);
	});
};