import type { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../lib/prisma.js";

export const getInfo = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const projects = await prisma.project.findMany();
    const skills = await prisma.skill.findMany();

    reply.send({
      projects,
      skills,
      count: { projects: projects.length, skills: skills.length },
    });
  } catch (e: any) {
    reply.code(500).send({ message: e.message });
  }
};
