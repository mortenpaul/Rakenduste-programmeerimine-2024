const crypto = require("crypto");
const cats = [
  {
    id: "627ce527-7f0b-4a0d-9fdf-b389055d4e9b",
    name: "Tiku",
    createdAt: 1727452180355,
    updatedAt: null,
    deleted: false,
  },
  {
    id: "8bfa7139-b41b-47ff-a4c4-1e9aee27e7bf",
    name: "Taku",
    createdAt: 1727452275695,
    updatedAt: null,
    deleted: false,
  },
];

exports.create = (req, res) => {
  const { name } = req.body;

  if (!name || name === "") {
    return res
      .status(418)
      .send({ type: "Error", message: "Must include a name" });
  }

  const newCat = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    updatedAt: null,
    deleted: false,
  };

  cats.push(newCat);

  res.send(newCat);
};

exports.read = (req, res) => {
  const activeCats = cats.filter((cat) => !cat.deleted);
  res.send(activeCats);
};

exports.update = (req, res) => {
  const { id, name } = req.body;

  const cat = cats.find((cat) => cat.id === id && !cat.deleted);
  if (!cat) {
    return res.status(404).send({ message: "Cat not found" });
  }

  cat.name = name || cat.name;
  cat.updatedAt = Date.now();

  res.send(cat);
};

exports.delete = (req, res) => {
  const { id } = req.body;
  const cat = cats.find((cat) => cat.id === id);

  if (!cat) {
    return res.status(404).send({ message: "Cat not found" });
  }

  cat.deleted = true;
  cat.updatedAt = Date.now();

  res.send({ message: "Cat deleted successfully" });
};