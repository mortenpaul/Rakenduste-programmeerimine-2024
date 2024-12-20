import { Box, Button, Stack, TextField } from "@mui/material";
import React, { useState } from "react";

type SubmitTodoProps = {
  fetchTodo: () => void;
};

const SubmitTodo = ({ fetchTodo }: SubmitTodoProps) => {
  const [title, setTitle] = useState("");

  const submitTodo = async () => {
    try {
      const response = await fetch("http://localhost:8080/todo", {  
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: title }),
      });

      if (response.ok) {
        console.log("Success", response);
        // Snackbar success
      } else {
        console.warn("No success");
        // Snackbar
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    submitTodo();
    setTimeout(fetchTodo, 100);
  };

  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <form onSubmit={handleSubmit}>
        <Stack>
          <TextField
            label="Todo title"
            onChange={(event) => setTitle(event.target.value)}
          />
          <Button type="submit">Add</Button>
        </Stack>
      </form>
    </Box>
  );
};

export default SubmitTodo;