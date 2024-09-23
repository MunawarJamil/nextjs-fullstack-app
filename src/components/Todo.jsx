import React from "react";

function Todo({
  completeTodo,
  mongoId,
  title,
  description,
  isCompleted,
  deleteTodo,
}) {
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <td className="px-6 py-4">{mongoId}</td>
      <td className="px-6 py-4">{title}</td>
      <td className="px-6 py-4">{description}</td>
      <td className="px-6 py-4">{isCompleted ? "Completed" : "Pending"}</td>
      <td className="px-6 py-4 flex gap-1">
        <button
          onClick={() => deleteTodo(mongoId)}
          className="py-2 px-4 bg-red-500 text-white"
        >
          Delete
        </button>
        <button
          onClick={() => completeTodo(mongoId)}
          className="py-2 px-4 bg-green-500 text-white"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default Todo;
