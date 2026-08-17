import { prisma } from "./lib/prisma.js";
import "dotenv";
import Fastify from "fastify";
import {
  messageBodySchema,
  type Message,
} from "./validators/message.validator.js";

const app = Fastify({
  logger: true,
});

// Получение общих данных по портфолио ( на главной - проекты и скиллы )
app.get("/info", async (request, reply) => {
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
});

// Фидбек от пользователя
app.post<{
  Body: Message;
}>(
  "/feedback",
  {
    schema: {
      body: messageBodySchema,
    },
  },
  async (request, reply) => {
    try {
      const { name, email, theme, message } = request.body as any;
      const feedback = await prisma.message.create({
        data: {
          name,
          email,
          theme,
          message,
          isRead: false,
        },
      });
      reply.send(feedback);
    } catch (e: any) {
      reply.code(500).send({ message: e.message });
    }
  },
);

const start = async () => {
  try {
    await app.listen({ port: 5012 });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};
start();
