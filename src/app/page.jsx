"use client";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import Todo from "../components/Todo";
import axios from "axios";
export default function Home() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  // const [formTitle, setFormTitle] = useState({ title: "" });
  // const [formdescription, setFormdescription] = useState({ description: "" });
  //===================================================
  // fetch all todos from mongo db and display in table form in frontend

  const [todoData, setTodoData] = useState([]);
  const fetchTodo = async () => {
    const response = await axios("/api");
    setTodoData(response.data.todos);
  };

  useEffect(() => {
    fetchTodo();
  }, []);

  const deleteTodo = async (id) => {
    try {
      const response = await axios.delete("/api", {
        params: { mongoId: id },
      });

      toast.success(response.data.message);
      // Re-fetch the todo list after deletion
      fetchTodo();
    } catch (error) {
      toast.error("Error deleting the todo");
    }
  };

  const completeTodo = async (id) => {
    const response = await axios.put(
      "/api",
      {},
      {
        params: {
          mongoId: id,
        },
      }
    );
    toast.success(response.data.message);
    fetchTodo();
  };

  //===================================================
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((form) => ({ ...form, [name]: value }));
    // console.log(formData);
  };

  // const handleForm = (data: any) => {
  //   const { name, value } = data.target;
  //   if (name === "title") {
  //     setFormTitle((form) => ({ ...form, title: value }));
  //     console.log(formTitle);
  //   }
  //   if (name === "description") {
  //     setFormdescription((form) => ({ ...form, description: value }));
  //     console.log(formdescription);
  //   }
  // };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api", formData);
      toast.success(response.data.message);
      setFormData({ title: "", description: "" });
      fetchTodo();
    } catch (error) {
      toast.error("error");
    }
  };
  return (
    <>
      <ToastContainer theme="dark" />
      <form
        onSubmit={onSubmitHandler}
        className="flex items-start flex-col gap-2 w-[80%] max-w-[600px] mt-24 px-2 mx-auto "
      >
        <input
          type="text "
          name="title"
          onChange={onChangeHandler}
          // onChange={handleForm}
          value={formData.title}
          placeholder="Enter Title"
          className=" border-2 px-3 py-2 w-full "
        />
        <textarea
          name="description"
          onChange={onChangeHandler}
          // onChange={handleForm}
          value={formData.description}
          placeholder="Enter description"
          className="border-2 px-3 py-2 w-full"
        ></textarea>
        <button type="submit" className="bg-orange-600 py-2 px-8   ">
          Add todo
        </button>
      </form>

      <div className="relative overflow-x-auto w-[60%] mx-auto mt-20 ">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Id
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                description
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {/* <Todo /> */}

            {todoData.map((item, index) => {
              return (
                <Todo
                  id={index + 1}
                  title={item.title}
                  description={item.description}
                  isCompleted={item.isCompleted}
                  deleteTodo={deleteTodo}
                  mongoId={item._id}
                  completeTodo={completeTodo}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
