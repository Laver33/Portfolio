import type { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../lib/prisma.js";
import type { Project } from "../validators/project.validator.js";
import path from "path";
import fs from "fs";
import { uploadsDir } from "../paths.js";

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

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

export const postProject = async (
  request: FastifyRequest<{ Body: Project }>,
  reply: FastifyReply,
) => {
  try {
    const parts = request.parts();
    let file: any = null;
    const fields: any = {};

    for await (const part of parts) {
      if (part.type === "file") {
        // файл
        file = part;
      } else {
        // текстовое поле
        fields[part.fieldname] = part.value;
      }
    }

    // @ts-ignore
    const { title, description, stack, githubUrl, liveUrl } = request.body;

    // Сохранение файла
    let imageUrl = null;
    if (file) {
      const fileName = `${Date.now()}-${file.filename}`;
      const filePath = path.join(uploadsDir, fileName);

      // Сохранение на диск
      const writeStream = fs.createWriteStream(filePath);
      await new Promise((resolve, reject) => {
        file.file.pipe(writeStream);
        file.file.on("end", resolve);
        file.file.on("error", reject);
      });

      imageUrl = `/uploads/${fileName}`;
    }

    const project = await prisma.project.create({
      data: {
        title,
        description,
        stack: stack.split(",").map((item: string) => item.trim()),
        githubUrl,
        liveUrl,
        imageUrl,
      },
    });

    reply.send(project);
  } catch (e: any) {
    reply.code(500).send({ message: e.message });
  }
};
