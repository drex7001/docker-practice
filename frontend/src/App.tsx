import axios from "axios";
import { useEffect, useState } from "react";
import Task from "./Task";

// window.React = React;
export default function App() {
  interface Task {
    id: string;
    title: string;
    description: string;
  }

  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function fetchTasks() {
    axios
      .get("http://localhost:8000/api/tasks")
      // .get("http://localhost:8000/api/tasks")
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  function handleSubmit(event: any) {
    event.preventDefault();
    addTask(title, description);
    setTitle("");
    setDescription("");
  }

  function addTask(taskTitle: string, taskDescription: string) {
    axios
      .post("http://localhost:8000/api/tasks", {
        title: taskTitle,
        description: taskDescription,
      })
      .then((response) => {
        // console.log(response);
        if (response.status === 201) {
          fetchTasks();
        }
      })
      .catch((error) => {
        console.error("Error adding task:", error);
      });
  }

  function deleteTask(id: any) {
    axios
      .delete(`http://localhost:8000/api/tasks/${id}`)
      .then((response) => {
        if (response.status === 200) {
          fetchTasks();
        }
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
      });
  }

  return (
    <>
      <div className="flex flex-col w-full mx-auto md:flex-row lg:w-1/2">
        <div className="w-full p-4 md:w-1/3">
          <h2 className="mb-4 text-xl font-bold">Add Task</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="title">
                Title
              </label>
              <input
                id="title"
                name="title"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                type="text"
                className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Task
            </button>
          </form>
        </div>
        <div className="w-full p-4 md:w-2/3">
          <h2 className="mb-4 text-xl font-bold">Task List</h2>
          <ul className="space-y-4">
            {tasks.map((task: any) => (
              <Task
                key={task.id}
                title={task.title}
                description={task.description}
                handleDetele={deleteTask}
                id={task.id}
              />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
