import type { FastifyInstance } from "fastify";
import * as infoController from "../controllers/info.js";

export async function infoRoutes(fastify: FastifyInstance) {
  fastify.get("/info", infoController.getInfo);
}
