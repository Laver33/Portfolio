import type { FastifyInstance } from "fastify";
import { skillsRoutes } from "./skills.routes.js";
import { messageRoutes } from "./message.routes.js";
import { projectRoutes } from "./project.routes.js";

export async function registerRoutes(fastify: FastifyInstance) {
  await fastify.register(skillsRoutes);
  await fastify.register(messageRoutes);
  await fastify.register(projectRoutes);
}
