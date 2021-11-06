import { Schema, model, Document } from "mongoose";
import { IUser } from "./user.models";

export interface ITask extends Document {
  title: string;
  description: string;
  ready: boolean;
  user: IUser;
}

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    ready: {
      type: Boolean,
      default: false,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default model<ITask>("Task", taskSchema);
