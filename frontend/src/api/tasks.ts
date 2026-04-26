import axios from "axios";
import type { Task, TaskFormData } from "../types/task";

const api = axios.create({ baseURL: "/tasks" });

export const getTasks = (): Promise<Task[]> =>
  api.get<Task[]>("/").then((r) => r.data);

export const createTask = (data: TaskFormData): Promise<Task> =>
  api.post<Task>("/", data).then((r) => r.data);

export const updateTask = (id: string, data: Partial<TaskFormData>): Promise<Task> =>
  api.put<Task>(`/${id}`, data).then((r) => r.data);

export const deleteTask = (id: string): Promise<void> =>
  api.delete(`/${id}`).then(() => undefined);
