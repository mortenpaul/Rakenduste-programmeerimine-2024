import { Box, Button, Stack, TextField } from "@mui/material";
import React, { useState } from "react";

type SubmitTodoProps = {
    fetchTodos: () => void;
};

const SubmitTodo = ({ fetchTodos }: SubmitTodoProps) => {
    const [title, setTitle] = useState("");
    const [priority, setPriority] = useState<number>(1);

    const SubmitTodo = async () => {
        try {
            const response = await fetch("http://localhost:8080/todos", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ title: title }),
            });

            if (response.ok) {
                console.log("Success", response);
            } else {
                console.warn("No success");
            }
        } catch (error) {
            console.warn(error);
        }
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        SubmitTodo();
        setTimeout(fetchTodos, 100);
    };

    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <form onSubmit={handleSubmit}>
                <Stack>
                    <TextField 
                    label="Todo Title"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    />
                    <TextField
                    label="Priority"
                    type="number"
                    value={priority}
                    onChange={(event) => setPriority(Number(event.target.value))}
                    />
                    <Button variant="contained" type="submit" sx={{ background: "#5c6b73" }}>Add</Button>
                </Stack>
            </form>
        </Box>
    )
}

export default SubmitTodo;