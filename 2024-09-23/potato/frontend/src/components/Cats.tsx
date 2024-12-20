import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import SubmitCat from "./SubmitCat";

type Cat = {
    id: string;
    name: string;
    createdAt: number;
    updatedAt: number | null;
    deleted: boolean;
};

const Cats = () => {
    const [cats, setCats] = useState<Cat[]>([]);

    const fetchCats = async () => {
        const response = await fetch("http://localhost:8080/cats");
        const data = await response.json();

        setCats(data);
    };

    const handleDelete = async (id: string) => {
        await fetch("http://localhost:8080/cats", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        });
        fetchCats();
    };
    
    const handleEdit = async (cat: Cat) => {
        const newName = prompt("Enter a new name for the cat:", cat.name);
        if (!newName) return;
    
        await fetch("http://localhost:8080/cats", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: cat.id, name: newName }),
        });
        fetchCats(); 
    };

    useEffect(() => {
        fetchCats();
    }, []);

    return (
        <Box>
          <Typography variant="h3" sx={{ marginBottom: 2, fontWeight: 'bold' }}>Cats</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, marginBottom: 4 }}>
            {cats.map((cat) => (
              <Card 
                key={cat.id} 
                sx={{ minWidth: 275, maxWidth: 300, padding: 2, boxShadow: 3, '&:hover': { boxShadow: 6 } }}
              >
                <CardContent>
                  <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{cat.name}</Typography>
                  <Typography color="text.secondary">
                    Created At: {new Date(cat.createdAt).toLocaleString()}
                  </Typography>
                  <Typography color="text.secondary">
                    Updated At: {cat.updatedAt ? new Date(cat.updatedAt).toLocaleString() : "Never updated"}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, marginTop: 2 }}>
                    <Button variant="contained" onClick={() => handleEdit(cat)} sx={{ background: "#e6d0d2" }}>
                      Edit
                    </Button>
                    <Button variant="contained" color="secondary" onClick={() => handleDelete(cat.id)} sx={{ background: "#bdb8b8" }}> 
                      Delete
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
          <SubmitCat fetchCats={fetchCats} />
        </Box>
      );
};

export default Cats;