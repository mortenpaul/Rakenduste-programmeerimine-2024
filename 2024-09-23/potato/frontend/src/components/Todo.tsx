import { Box, List, ListItem, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import SubmitCat from "./SubmitTodo";

type Todo = {
  id: string;
  title: string;
  priority: number,
  finished: boolean,
  createdAt: number;
  updatedAt: number | null;
  deleted: boolean;
};

const Todo = () => {
  const [todo, setTodo] = useState<Todo[]>([]);

  const fetchTodo = async () => {
    const response = await fetch("http://localhost:8080/todo");
    const data = await response.json();

    setTodo(data);
  };

  useEffect(() => {
    fetchTodo();
  }, []);

  return (
    <Box>
      <Typography variant="h3">TODO</Typography>
      <List>
        {todo.map((todo) => (
          <ListItem key={todo.id}>{JSON.stringify(todo)}</ListItem>
        ))}
      </List>
      <SubmitCat fetchTodo={fetchTodo} />
    </Box>
  );
};

export default Todo;