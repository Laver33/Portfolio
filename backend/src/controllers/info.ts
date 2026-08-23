import type { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../lib/prisma.js";

export const getSkills = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const skills = await prisma.skill.findMany();

    reply.send({
      skills,
      count: { skills: skills.length },
    });
  } catch (e: any) {
    reply.code(500).send({ message: e.message });
  }
};
