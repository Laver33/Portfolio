import type { FastifyInstance } from "fastify";
import * as projectController from "../controllers/project.js";

export async function projectRoutes(fastify: FastifyInstance) {
  fastify.get("/projects/:id", projectController.getProjectById);
  fastify.get("/projects", projectController.getProjects);
  fastify.post("/projects", projectController.postProject);
}
