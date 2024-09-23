import mongoose, { Schema } from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      required: true,
    },
    description: {
      type: String,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const todoModel = mongoose.models.todo || mongoose.model("todo", todoSchema); //for preventing from multiple request to generate todo model
export default todoModel;
