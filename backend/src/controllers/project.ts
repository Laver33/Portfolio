import type { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../lib/prisma.js";

export const getProject = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { id } = request.params as { id: string };
    const project = await prisma.project.findUnique({
      where: { id: id },
    });

    if (!project) {
      reply.code(404).send({ message: "Проект не найден" });
    }

    reply.send(project);
  } catch (e: any) {
    reply.code(500).send({ message: e.message });
  }
};

export const getProjects = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const response = await prisma.project.findMany();

    reply.send(response);
  } catch (e: any) {
    reply.code(500).send({ message: e.message });
  }
};
