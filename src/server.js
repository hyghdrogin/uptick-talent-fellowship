import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

export const server = (
	port, router, baseUrl = "/"
) => {
	const app = express();
  
	app.use(cors());
	app.use(bodyParser.json({ limit: "50mb" }));
	app.use(express.json({ limit: "50mb" }));
	app.use(express.urlencoded({ extended: false, limit: "50mb" }));
  
	app.get("/", (req, res) => {
		res.status(200).send({ success: true, message: "API homepage" });
	});
  
	app.use(baseUrl, router);
  
	app.use((req, res) => {
		res.status(404).send({ success: false, message: "invalid Route" });
	});
  
	app.listen(port, async () => {
		console.info(`Listening on port ${port}`);
	});
};