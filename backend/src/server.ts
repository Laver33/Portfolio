import helmet from "@fastify/helmet";
import Fastify from "fastify";
import cors from "@fastify/cors";
import "dotenv/config";
import { registerRoutes } from "./routes/index.js";
import { fileURLToPath } from "url";
import path from "path";
import fastifyMultipart from "@fastify/multipart";
import fastifyStatic from "@fastify/static";
import { uploadsDir } from "./paths.js";

export const __filename = fileURLToPath(import.meta.url);
export const dirname = path.dirname(__filename);
const app = Fastify({ logger: true });

// Плагины
await app.register(cors, {
  origin: "http://localhost:5173",
  credentials: true,
});

// Регистрации
await app.register(fastifyMultipart, {
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});
await app.register(fastifyStatic, {
  root: uploadsDir,
  prefix: "/uploads/",
});
await app.register(helmet);

// Роуты
await registerRoutes(app);

const start = async () => {
  try {
    await app.listen({ port: 5012 });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};
start();
