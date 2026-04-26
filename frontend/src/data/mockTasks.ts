import type { Task, TaskFormData } from "../types/task";

const now = new Date().toISOString();

export const initialTasks: Task[] = [
  {
    id: "task-1",
    title: "Sketch the task board",
    description: "Lay out the columns and core card actions in the frontend.",
    status: "TODO",
    priority: "HIGH",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "task-2",
    title: "Wire up local form state",
    description: "Keep create and edit flows working without a backend.",
    status: "IN_PROGRESS",
    priority: "MEDIUM",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "task-3",
    title: "Polish empty states",
    description: null,
    status: "DONE",
    priority: "LOW",
    createdAt: now,
    updatedAt: now,
  },
];

export function createTaskRecord(data: TaskFormData): Task {
  const timestamp = new Date().toISOString();

  return {
    id: `task-${crypto.randomUUID()}`,
    title: data.title,
    description: data.description?.trim() || null,
    status: data.status,
    priority: data.priority,
    createdAt: timestamp,
    updatedAt: timestamp,
  };
}

export function updateTaskRecord(
  task: Task,
  data: Partial<TaskFormData>,
): Task {
  return {
    ...task,
    title: data.title ?? task.title,
    description:
      data.description === undefined
        ? task.description
        : data.description.trim() || null,
    status: data.status ?? task.status,
    priority: data.priority ?? task.priority,
    updatedAt: new Date().toISOString(),
  };
}
