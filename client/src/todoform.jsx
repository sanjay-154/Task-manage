
import { useState } from "react";
import "./todoform.css";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function Form({ onAddTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAddTask = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Please enter title");
      return;
    }

    onAddTask(title, description);

    setTitle("");
    setDescription("");
  };

  return (
    <section className="border border-black rounded-xl p-3 mt-2 mb-2 bg-white">

      <h4 className="text-lg font-semibold mb-2">
        Add New Task
      </h4>

      <form onSubmit={handleAddTask}>

        <TextField
          label="Enter title here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          size="small"
          sx={{ mb: 1 }}
        />

        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          multiline
          minRows={2}
          maxRows={2}
          size="small"
          sx={{
            mb: 1,
            "& .MuiInputBase-root": {
              minHeight: "65px",
            },
          }}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ height: "35px" }}
        >
          Add Task +
        </Button>

      </form>
    </section>
  );
}
