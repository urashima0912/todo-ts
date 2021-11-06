import { Request, Response } from "express";
import models from "../models";
import jwt from "jsonwebtoken";
import config from "../config";
import { IToken } from "../interfaces/token.interface";

export default {
  signIn: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ err: "Email or password are require" });
      }

      const user = await models.user.findOne({ email });
      if (!user) {
        return res.status(400).json({ err: "The user does not exist" });
      }

      await user.comparePassword(password);

      const payload: IToken = {
        id: user._id,
        email: user.email,
      };

      const token = jwt.sign(payload, config.JWT.SECRET, {
        expiresIn: "1d",
      });

      return res.status(200).json({ token, userId: user._id });
    } catch (err: any) {
      return res.status(400).json({ err: err.message });
    }
  },

  signUp: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ err: "Email or password are require" });
      }

      const user = await models.user.findOne({ email });
      if (user) {
        return res.status(400).json({ err: "The user exists" });
      }

      const newUser = await models.user.create({ email, password });

      return res.status(201).json({ newUser });
    } catch (err: any) {
      return res.status(400).json({ err: err.message });
    }
  },
};
