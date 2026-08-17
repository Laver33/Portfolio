import type { FastifyInstance } from "fastify";
import { infoRoutes } from "./info.routes.js";
import { messageRoutes } from "./message.routes.js";

export async function registerRoutes(fastify: FastifyInstance) {
  await fastify.register(infoRoutes);
  await fastify.register(messageRoutes);
}
