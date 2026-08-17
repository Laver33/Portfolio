import type { FastifyInstance } from "fastify";
import {
  messageBodySchema,
  type Message,
} from "../validators/message.validator.js";
import * as messageController from "../controllers/message.js";

export async function messageRoutes(fastify: FastifyInstance) {
  // Создание сообщения
  fastify.post<{
    Body: Message;
  }>(
    "/message",
    {
      schema: {
        body: messageBodySchema,
      },
    },
    messageController.createMessage,
  );

  fastify.get("/messages", messageController.getMessages);
  fastify.delete("/message/:id", messageController.deleteMessage);
  fastify.get("/message/:id", messageController.getMessage);
}
