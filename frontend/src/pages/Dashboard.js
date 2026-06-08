import { useEffect, useState } from "react";
import { createTodo, getTodos } from "../services/api";

function Dashboard() {
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState([]);

  const token = localStorage.getItem("token");

  const loadTodos = async () => {
    const data = await getTodos(token);

    if (Array.isArray(data)) {
      setTodos(data);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const handleAddTodo = async () => {
    await createTodo(title, token);

    setTitle("");

    loadTodos();
  };

  return (
    <div>
      <h1>Dashboard</h1>

      <input
        type="text"
        placeholder="Enter Todo"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
      />

      <button onClick={handleAddTodo}>
        Add Todo
      </button>

      <hr />

      {todos.map((todo) => (
        <div key={todo._id}>
          {todo.title}
        </div>
      ))}
    </div>
  );
}

export default Dashboard;