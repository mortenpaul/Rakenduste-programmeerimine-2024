import { Box, Button, Stack, TextField } from "@mui/material";
import React, { useState } from "react";

type SubmitCatProps = {
    fetchCats: () => void;
};

const SubmitCat = ({ fetchCats }: SubmitCatProps) => {
    const [name, setName] = useState("");

    const submitCat = async () => {
        try {
            const response = await fetch("http://localhost:8080/cats", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: name }),
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

        submitCat();
        setTimeout(fetchCats, 100);
    };

    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <form onSubmit={handleSubmit}>
                <Stack>
                    <TextField label="Cat name"
                    onChange={(event) => setName(event.target.value)}/>
                    <Button variant="contained" type="submit" sx={{ background: "#5c6b73" }}>
                        Add
                    </Button>
                </Stack>
            </form>
        </Box>
    );
    
};

export default SubmitCat;