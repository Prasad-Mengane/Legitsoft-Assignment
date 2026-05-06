import { useState, useEffect } from "react";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");
  const [editId, setEditId] = useState(null);

  // Load
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("todos"));
    if (saved) setTodos(saved);
  }, []);

  // Save
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Add
  const addTodo = () => {
    if (!input.trim()) return;
    setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
    setInput("");
  };

  // Toggle
  const toggleTodo = (id) => {
    setTodos(todos.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  // Delete
  const deleteTodo = (id) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  // Edit
  const saveEdit = (id, newText) => {
    setTodos(todos.map(t =>
      t.id === id ? { ...t, text: newText } : t
    ));
    setEditId(null);
  };

  // Clear completed
  const clearCompleted = () => {
    setTodos(todos.filter(t => !t.completed));
  };

  // Filter
  const filtered = todos.filter(t => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  const activeCount = todos.filter(t => !t.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center p-4">
      
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-6">

        {/* Header */}
        <h1 className="text-2xl font-bold text-center mb-6">To-Do List</h1>

        {/* Input */}
        <div className="flex gap-2 mb-4">
          <input
            className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a task..."
            onKeyDown={(e) => e.key === "Enter" && addTodo()}
          />
          <button
            onClick={addTodo}
            className="bg-blue-600 text-white px-4 rounded-lg hover:bg-blue-700 transition"
          >
            Add
          </button>
        </div>

        {/* Filters */}
        <div className="flex justify-between items-center mb-4 text-sm">
          <div className="flex gap-2">
            {["all", "active", "completed"].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1 rounded-full ${
                  filter === f
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <button
            onClick={clearCompleted}
            className="text-red-500 hover:underline"
          >
            Clear Completed
          </button>
        </div>

        {/* List */}
        <ul className="space-y-2 max-h-80 overflow-y-auto pr-1">
          {filtered.map(todo => (
            <li
              key={todo.id}
              className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg hover:shadow transition"
            >
              <div className="flex items-center gap-2 flex-1">

                {/* Checkbox */}
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                />

                {/* Text / Edit */}
                {editId === todo.id ? (
                  <input
                    autoFocus
                    defaultValue={todo.text}
                    onBlur={(e) => saveEdit(todo.id, e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" &&
                      saveEdit(todo.id, e.target.value)
                    }
                    className="border px-2 py-1 rounded w-full"
                  />
                ) : (
                  <span
                    onDoubleClick={() => setEditId(todo.id)}
                    className={`flex-1 cursor-pointer ${
                      todo.completed
                        ? "line-through text-gray-400"
                        : ""
                    }`}
                  >
                    {todo.text}
                  </span>
                )}
              </div>

              {/* Delete */}
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-red-500 hover:text-red-700 px-2"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>

        {/* Footer */}
        <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
          <span>{activeCount} tasks left</span>
        </div>

      </div>
    </div>
  );
}