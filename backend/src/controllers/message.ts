import type { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../lib/prisma.js";
import { type Message } from "../validators/message.validator.js";

export const createMessage = async (
  request: FastifyRequest<{ Body: Message }>,
  reply: FastifyReply,
) => {
  try {
    // @ts-ignore
    const { name, email, theme, message } = request.body;
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
};

export const getMessages = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const response = await prisma.message.findMany({});

    reply.send(response);
  } catch (e: any) {
    reply
      .code(500)
      .send({ message: "Проблема с получением сообщений", error: e.message });
  }
};

export const deleteMessage = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { id } = request.params as { id: string };
    const response = await prisma.message.delete({ where: { id } });

    if (!response) {
      reply.code(404).send({ message: "Сообщение не найдено" });
    }

    await prisma.message.delete({ where: { id } });
    reply.send({ message: "Сообщение удалено" });
  } catch (e: any) {
    reply
      .code(500)
      .send({ message: "Проблема с удалением сообщения", error: e.message });
  }
};

export const getMessage = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const { id } = request.params as { id: string };
    const response = await prisma.message.findUnique({ where: { id } });

    if (!response) {
      reply.code(404).send({ message: "Сообщение не найдено" });
    }

    reply.send(response);
  } catch (e: any) {
    reply
      .code(500)
      .send({ message: "Проблема с получением сообщения", error: e.message });
  }
};
