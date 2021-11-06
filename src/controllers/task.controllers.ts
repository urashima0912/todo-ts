import { Request, Response } from "express";
import models from "../models";
import { ITask } from "../models/task.models";

export default {
  create: async (req: Request, res: Response) => {
    try {
      const { title, description, userId } = req.body;

      if (!title || !description || !userId) {
        return res.status(400).json({ err: "Bad request" });
      }

      const user = await models.user.findById(userId);
      if (!user) {
        return res.status(400).json({ err: "Bad request" });
      }

      const task = await models.task.create({
        title,
        description,
        user,
      });

      return res.status(201).json({ task });
    } catch (err: any) {
      return res.status(400).json({ err: err.message });
    }
  },
  all: async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      if (!userId) {
        return res.status(400).json({ err: "Bad request" });
      }

      const user = await models.user.findById(userId);
      if (!user) {
        return res.status(400).json({ err: "Bad request" });
      }

      const tasks = await models.task.find({ user });

      return res.status(200).json({ tasks });
    } catch (err: any) {
      return res.status(400).json({ err: err.message });
    }
  },
  get: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ err: "Bad request" });
      }

      const task: ITask | null = await models.task.findById(id);

      return res.status(200).json({ task });

      /**/
    } catch (err: any) {
      return res.status(400).json({ err: err.message });
    }
  },
  update: async (req: Request, res: Response) => {
    try {
      const { title, description, ready } = req.body;
      const { id } = req.params;
      if (!id || !title || !description || (!ready && ready !== false)) {
        return res.status(400).json({ err: "Bad request" });
      }

      const task: ITask | null = await models.task.findById(id);
      if (!task) {
        return res.status(400).json({ err: "Bad request" });
      }

      task.title = title;
      task.description = description;
      task.ready = ready;
      await task.save();

      return res.status(200).json({ task });
    } catch (err: any) {
      return res.status(400).json({ err: err.message });
    }
  },
  remove: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { userId } = req.body;

      if (!id || !userId) {
        return res.status(400).json({ err: "Bad request" });
      }

      await models.task.findByIdAndRemove(id);

      const user = await models.user.findById(userId);
      if (!user) {
        return res.status(400).json({ err: "Bad request" });
      }

      const tasks = await models.task.find({ user });

      return res.status(200).json({ tasks });
    } catch (err: any) {
      return res.status(400).json({ err: err.message });
    }
  },
};
