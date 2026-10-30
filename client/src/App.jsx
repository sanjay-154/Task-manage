import { useState, useRef } from "react";
import axios from "axios";

import Header from "./header";
import Form from "./todoform";
import List from "./todolist";
import Stat from "./todostat";
import "./App.css";

const API_URL = "http://localhost:5000/api/todos";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [message, setMessage] = useState("Loading Tasks...");
  const [totalTodos, setTotalTodos] = useState(0);
  const [showTodos, setShowTodos] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const loadingRef = useRef(false);

  const fetchTodos = async (page) => {
    if (loadingRef.current) return;

    loadingRef.current = true;
    setLoading(true);

    try {
      const response = await axios.get(API_URL, {
        params: { page },
      });

      const data = response.data.data;

      setTodos(data.todos);
      setCurrentPage(data.currentPage);
      setNextPage(data.nextPage);
      setHasMore(data.hasMore);
      setTotalTodos(data.totalTodos);
      setMessage("");
    } catch (error) {
      console.error(error);
      setMessage("Failed to load tasks. Check your backend.");
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  };

  const loadMoreTodos = () => {
    if (hasMore && nextPage !== null) {
      fetchTodos(nextPage);
    }
  };

  const loadPreviousTodos = () => {
    if (currentPage > 1) {
      fetchTodos(currentPage - 1);
    }
  };

  const addTask = async (title, description) => {
    try {
      await axios.post(API_URL, { title, description });

      if (showTodos) {
        await fetchTodos(1);
      } else {
        setTotalTodos((prev) => prev + 1);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to add task");
    }
  };

  const toggleTask = async (id, completed) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, {
        completed: !completed,
      });

      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? response.data.data : todo)),
      );
    } catch (error) {
      console.error(error);
      alert("Failed to update task status");
    }
  };

  const editTask = async (id, title, description) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, {
        title,
        description,
      });

      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? response.data.data : todo)),
      );
    } catch (error) {
      console.error(error);
      alert("Failed to edit task");
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);

      setTodos((prev) => prev.filter((todo) => todo.id !== id));

      setTotalTodos((prev) => Math.max(0, prev - 1));
    } catch (error) {
      console.error(error);
      alert("Failed to delete task");
    }
  };

  const handleToggleTodos = () => {
    if (showTodos) {
      setShowTodos(false);
    } else {
      setTodos([]);
      setCurrentPage(1);
      setNextPage(null);
      setHasMore(true);
      setShowTodos(true);

      fetchTodos(1);
    }
  };

  // Count completed tasks
  const completed = todos.filter((todo) => todo.completed).length;

  return (
    <main className="h-dvh max-w-lg mx-auto border rounded px-4 bg-amber-50 flex flex-col overflow-hidden">
      <div className="shrink-0">
        <Header />

        {message && <p className="my-1 text-center text-sm">{message}</p>}
      </div>

      <div className="shrink-0">
        <Form onAddTask={addTask} />
      </div>

      <div className="shrink-0 mb-3">
        <Stat
          total={totalTodos}
          completed={completed}
          pending={totalTodos - completed}
        />

        <button
          onClick={handleToggleTodos}
          className="border rounded px-3 py-2 mb-1 bg-white"
        >
          {showTodos ? "Hide Todos" : "Load Todos"}
        </button>
      </div>

      {showTodos && (
        <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden">
          <List
            todos={todos}
            onToggleComplete={toggleTask}
            onEditTask={editTask}
            onDeleteTask={deleteTask}
            onLoadMore={loadMoreTodos}
            hasMore={hasMore}
            loading={loading}
            onLoadPrevious={loadPreviousTodos}
            hasPrevious={currentPage > 1}
          />
        </div>
      )}
    </main>
  );
}
