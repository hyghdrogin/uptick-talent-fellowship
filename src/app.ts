import "dotenv/config";
import { server } from "./server";
import router from "./routes";

server(process.env.PORT ?? 5000, router);