import { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function Item({
  todo,
  onToggleComplete,
  onDeleteTask,
  onEditTask,
}) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description || "");

  const saveTask = () => {
    if (!title.trim()) {
      alert("Please enter title");
      return;
    }
    onEditTask(todo.id, title, description);
    setEditing(false);
  };

  const cancelEdit = () => {
    setTitle(todo.title);
    setDescription(todo.description || "");
    setEditing(false);
  };

  return (
    <li className="flex items-start gap-3 rounded-lg border p-4 w-full ">
      <div>
        <Checkbox
          checked={todo.completed}
          onChange={() => onToggleComplete(todo.id, todo.completed)}
          className="mt-1 shrink-0"
        />
      </div>

      <div className="flex-1">
        {editing ? (
          <>
            <TextField
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              margin="dense"
            />
            <TextField
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              margin="dense"
            />

            <Button onClick={saveTask}>Save</Button>
            <Button onClick={cancelEdit}>Cancel</Button>
          </>
        ) : (
          <>
            <div>
              <span className="font-bold wrap-break-word">{todo.title}</span>
              <span className="wrap-break-words whitespace-pre-wrap">
                {todo.description && <p>{todo.description}</p>}
              </span>
            </div>

            <div className="flex gap-2 mt-3">
              <Button
                variant="contained"
                color="primary"
                onClick={() => setEditing(true)}
              >
                Edit
              </Button>

              <Button
                variant="contained"
                color="error"
                onClick={() => onDeleteTask(todo.id)}
              >
                Delete
              </Button>
            </div>
          </>
        )}
      </div>
    </li>
  );
}
