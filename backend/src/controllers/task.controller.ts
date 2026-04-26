import { Request, Response } from "express";
import { ZodError } from "zod";
import { taskSchema, partialTaskSchema } from "../schemas/task.schema.js";
import * as taskModel from "../models/task.model.js";

export const getAll = async (_req: Request, res: Response) => {
  const tasks = await taskModel.findAll();
  res.status(200).json(tasks);
};

export const create = async (req: Request, res: Response) => {
  try {
    const data = taskSchema.parse(req.body);
    const newTask = await taskModel.create(data);
    res.status(201).json(newTask);
  } catch (error) {
    if (error instanceof ZodError) return res.status(400).json(error.issues);
    res.status(500).json(error);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const data = partialTaskSchema.parse(req.body);
    const updatedTask = await taskModel.update(id, data);
    res.status(200).json(updatedTask);
  } catch (error) {
    if (error instanceof ZodError) return res.status(400).json(error.issues);
    res.status(500).json(error);
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const deletedTask = await taskModel.remove(id);
    res.status(200).json(deletedTask);
  } catch (error) {
    res.status(500).json(error);
  }
};
