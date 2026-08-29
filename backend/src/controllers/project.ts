import type { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../lib/prisma.js";
import type { Project } from "../validators/project.validator.js";

const uploadsDir = "./uploads";

export const getProjectById = async (
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

export const postProject = async (
  request: FastifyRequest<{ Body: Project }>,
  reply: FastifyReply,
) => {
  try {
    const data: any = await request.file();

    if (!data) {
      return reply.status(400).send({ message: "Файл не загружен" });
    }
    const buffer = await data.toBuffer();

    const base64Image = `data:${data.mimetype};base64,${buffer.toString("base64")}`;

    // @ts-ignore
    const title = data.fields.title?.value;
    const description = data.fields.description?.value;
    const stack = data.fields.stack?.value;
    const githubUrl = data.fields.githubUrl?.value || null;
    const liveUrl = data.fields.liveUrl?.value || null;

    let stackArray: string[] = [];
    try {
      stackArray = JSON.parse((stack?.value as string) || "[]");
    } catch (e) {
      stackArray = [];
    }

    const project = await prisma.project.create({
      data: {
        title,
        description,
        stack: stackArray,
        githubUrl,
        liveUrl,
        imageUrl: base64Image,
      },
    });

    reply.send(project).status(201);
  } catch (e: any) {
    console.error(e);
    reply.status(500).send({ message: e.message });
  }
};
