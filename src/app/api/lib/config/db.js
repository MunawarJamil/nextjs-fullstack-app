import mongoose from "mongoose";

export const db_connect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://admin:admin@cluster0.idu1y.mongodb.net/nextjs-todo"
    );
    console.log("db connected successfully...");
  } catch (error) {
    console.log("error while connected to db ...", error);
  }
};
