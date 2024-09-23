import { NextResponse } from "next/server";
import { db_connect } from "./lib/config/db.js";
import todoModel from "./lib/models/totdo.model.js";

const conn = async () => {
  await db_connect();
};
conn();
export async function GET(request) {
  try {
    const getAllTodos = await todoModel.find({});
    return NextResponse.json({ todos: getAllTodos });
  } catch (error) {
    return NextResponse.json(
      { msg: "Failed to connect to DB", error: error.message },
      { status: 500 }
    );
  }
}

//create todo
export async function POST(request) {
  try {
    // Parse the request body using await
    const { title, description } = await request.json();

    // Create a new todo document
    const todo = new todoModel({
      title,
      description,
    });

    // Save the todo to the database
    await todo.save();

    // Respond with success
    return new Response(
      JSON.stringify({ message: "Todo created successfully", todo }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    // Handle any errors
    return new Response(
      JSON.stringify({ message: "Error creating todo", error }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

//delete todo
export async function DELETE(request) {
  try {
    const mongoId = request.nextUrl.searchParams.get("id");

    // Check if mongoId exists
    if (!mongoId) {
      return NextResponse.json(
        { message: "Todo ID not provided" },
        { status: 400 }
      );
    }

    // Find and delete the todo
    const deletedTodo = await todoModel.findByIdAndDelete(mongoId);

    // Check if the todo was found and deleted
    if (!deletedTodo) {
      return NextResponse.json({ message: "Todo not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Todo deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting todo", error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const mongoId = request.nextUrl.searchParams.get("id");

    // Check if mongoId exists
    if (!mongoId) {
      return NextResponse.json(
        { message: "Todo ID not provided to update" },
        { status: 400 }
      );
    }

    // Find and delete the todo
    const updateStatus = await todoModel.findByIdAndUpdate(mongoId);

    // Check if the todo was found and deleted
    if (!updateStatus) {
      return NextResponse.json({ message: "Todo not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Todo updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating todo", error: error.message },
      { status: 500 }
    );
  }
}
