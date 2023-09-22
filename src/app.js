import "dotenv/config";
import { server } from "./server.js";
import router from "./routes/index.js";

server(process.env.PORT ?? 5000, router);