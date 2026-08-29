import helmet from "@fastify/helmet";
import Fastify from "fastify";
import cors from "@fastify/cors";
import "dotenv/config";
import { registerRoutes } from "./routes/index.js";
import fastifyMultipart from "@fastify/multipart";

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
