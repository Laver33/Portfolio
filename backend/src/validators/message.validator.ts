import { S } from "fluent-json-schema";
import type { FromSchema } from "json-schema-to-ts";

export const messageBodySchema = S.object()
  .prop("name", S.string().minLength(2).maxLength(50).required())
  .prop("email", S.string().format("email").required())
  .prop("theme", S.string().maxLength(100))
  .prop("message", S.string().minLength(10).maxLength(1000).required())
  .valueOf();

export type Message = FromSchema<typeof messageBodySchema>;
