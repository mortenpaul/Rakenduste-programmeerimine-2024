import { useEffect, useState } from "react";
import SubmitTodo from "./SubmitTodo";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";

type Todo = {
    id: string;
    title: string;
    priority: number;
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

    const handleDelete = async (id: string) => {
        await fetch("http://localhost:8080/todo", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id }),
        });
        fetchTodo();
    };

    const handleEdit = async (todo: Todo) => {
        const newTitle = prompt("Enter a new title for the todo:", todo.title);
        if (!newTitle) return;

        await fetch("http://localhost:8080/todo", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: todo.id, title: newTitle }),
        });
        fetchTodo();
    };

    useEffect(() => {
        fetchTodo();
    }, []);

    return (
        <Box>
          <Typography variant="h3" sx={{ marginBottom: 2, fontWeight: 'bold' }}>Todos</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2,marginBottom: 4 }}>
            {todo.map((todo) => (
              <Card 
                key={todo.id} 
                sx={{ minWidth: 275, maxWidth: 300, padding: 2, boxShadow: 3, '&:hover': { boxShadow: 6 } }}
              >
                <CardContent>
                  <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{todo.title}</Typography>
                  <Typography>Priority: {todo.priority}</Typography>
                  <Typography color="text.secondary">
                    Created At: {new Date(todo.createdAt).toLocaleString()}
                  </Typography>
                  <Typography color="text.secondary">
                    Updated At: {todo.updatedAt ? new Date(todo.updatedAt).toLocaleString() : "Never updated"}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, marginTop: 2 }}>
                    <Button variant="contained" color="primary" onClick={() => handleEdit(todo)}>
                      Edit
                    </Button>
                    <Button variant="contained" color="primary" onClick={() => handleDelete(todo.id)}>
                      Delete
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
          <SubmitTodo fetchTodos={fetchTodo} />
        </Box>
      );
}

export default Todo;