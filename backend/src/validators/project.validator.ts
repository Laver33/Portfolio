import { S } from "fluent-json-schema";
import type { FromSchema } from "json-schema-to-ts";

export const projectBodySchema = S.object()
  .prop("title", S.string().minLength(2).maxLength(100).required())
  .prop("description", S.string().minLength(2).maxLength(500).required())
  .prop("stack", S.string().required())
  .prop("githubUrl", S.string().format("url"))
  .prop("liveUrl", S.string().format("url"))
  .prop("imageUrl", S.string().format("url"))
  .valueOf();

export type Project = FromSchema<typeof projectBodySchema>;
