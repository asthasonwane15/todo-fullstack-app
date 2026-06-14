import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";

import {
  createTodo,
  getTodos,
  deleteTodo,
  updateTodo,
  toggleTodo,
} from "../services/api";

function Dashboard() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState([]);

  const [editingId, setEditingId] =
    useState(null);

  const [editTitle, setEditTitle] =
    useState("");

  const loadTodos = async () => {
    try {
      const data = await getTodos();

      if (Array.isArray(data)) {
        setTodos(data);
      } else if (
        data &&
        Array.isArray(data.todos)
      ) {
        setTodos(data.todos);
      } else {
        setTodos([]);
      }
    } catch (error) {
      console.log(error);
      setTodos([]);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const handleAddTodo = async (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    try {
      await createTodo(title);

      setTitle("");

      loadTodos();
    } catch (error) {
      console.log(error);
      alert("Failed to create todo");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);

      loadTodos();
    } catch (error) {
      console.log(error);
      alert("Failed to delete todo");
    }
  };

  const handleEdit = (todo) => {
    setEditingId(todo._id);
    setEditTitle(todo.title);
  };

  const handleUpdate = async (id) => {
    try {
      await updateTodo(
        id,
        editTitle
      );

      setEditingId(null);
      setEditTitle("");

      loadTodos();
    } catch (error) {
      console.log(error);
      alert("Failed to update todo");
    }
  };

  const handleToggle = async (
    id,
    currentStatus
  ) => {
    try {
      await toggleTodo(
        id,
        !currentStatus
      );

      loadTodos();
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard">

        <div className="dashboard-header">
          <h1>
            ✨ Smart Todo Dashboard
          </h1>

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

        <form
          className="todo-form"
          onSubmit={handleAddTodo}
        >
          <input
            type="text"
            placeholder="Enter Todo..."
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
          />

          <button type="submit">
            Add Todo
          </button>
        </form>

        <h2 className="todo-title">
          My Todos
        </h2>

        {todos.length === 0 ? (
          <div className="empty-state">
            No Todos Found 🚀
          </div>
        ) : (
          todos.map((todo) => (
            <div
              key={todo._id}
              className="todo-item"
            >
              {editingId ===
              todo._id ? (
                <>
                  <input
                    className="edit-input"
                    value={editTitle}
                    onChange={(e) =>
                      setEditTitle(
                        e.target.value
                      )
                    }
                  />

                  <button
                    className="save-btn"
                    onClick={() =>
                      handleUpdate(
                        todo._id
                      )
                    }
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <div className="todo-left">
                    <input
                      type="checkbox"
                      checked={
                        todo.completed ||
                        false
                      }
                      onChange={() =>
                        handleToggle(
                          todo._id,
                          todo.completed
                        )
                      }
                    />

                    <span
                      className={
                        todo.completed
                          ? "completed"
                          : ""
                      }
                    >
                      {todo.title}
                    </span>
                  </div>

                  <div className="actions">
                    <button
                      className="edit-btn"
                      onClick={() =>
                        handleEdit(
                          todo
                        )
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        handleDelete(
                          todo._id
                        )
                      }
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;