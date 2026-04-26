import { z } from "zod";

export const statusEnum = z.enum(["TODO", "IN_PROGRESS", "DONE"]);
export const priorityEnum = z.enum(["LOW", "MEDIUM", "HIGH"]);

export const taskSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  status: statusEnum.optional(),
  priority: priorityEnum.optional(),
});

export const partialTaskSchema = taskSchema.partial();

export type TaskInput = z.infer<typeof taskSchema>;
export type PartialTaskInput = z.infer<typeof partialTaskSchema>;
