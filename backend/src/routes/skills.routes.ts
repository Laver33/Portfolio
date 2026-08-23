import type { FastifyInstance } from "fastify";
import * as skillsController from "../controllers/info.js";

export async function skillsRoutes(fastify: FastifyInstance) {
  fastify.get("/skills", skillsController.getSkills);
}
