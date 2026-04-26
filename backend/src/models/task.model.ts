import prisma from "../lib/prisma.js";
import type { TaskInput, PartialTaskInput } from "../schemas/task.schema.js";

export const findAll = () =>
  prisma.task.findMany({ orderBy: { createdAt: "desc" } });

export const create = (data: TaskInput) =>
  prisma.task.create({ data: data as any });

export const update = (id: string, data: PartialTaskInput) =>
  prisma.task.update({ where: { id }, data: data as any });

export const remove = (id: string) => prisma.task.delete({ where: { id } });
