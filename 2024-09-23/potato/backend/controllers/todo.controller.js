const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

const todos = [
  {
    id: crypto.randomUUID(),
    title: "Sample Todo",
    priority: 1,
    createdAt: Date.now(),
    updatedAt: null,
    deleted: false,
  },
];

exports.create = [
  //validation
  check("title").notEmpty().withMessage("Title is required"),
  check("priority")
    .isInt({ min: 1, max: 5 })
    .withMessage("Priority must be a number between 1 and 5"),

  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, priority } = req.body;

    const newTodo = {
      id: crypto.randomUUID(),
      title: title,
      priority: priority || 1,
      createdAt: Date.now(),
      updatedAt: null,
      deleted: false,
    };

    todos.push(newTodo);
    res.send(newTodo);
  },
];

exports.read = (req, res) => {
  const activeTodos = todos.filter((todo) => !todo.deleted);
  res.send(activeTodos);
};

exports.update = [
  //validation
  check("id").notEmpty().withMessage("ID is required"),
  check("title").optional().notEmpty().withMessage("Title is required"),
  check("priority")
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage("Priority must be a number between 1 and 5"),

  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id, title, priority } = req.body;

    const todo = todos.find((todo) => todo.id === id && !todo.deleted);
    if (!todo) {
      return res.status(404).send({ message: "Todo not found" });
    }

    todo.title = title || todo.title;
    todo.priority = priority || todo.priority;
    todo.updatedAt = Date.now();

    res.send(todo);
  },
];

exports.delete = [
  //validation
  check("id").notEmpty().withMessage("ID is required"),

  (req, res) => {
    const { id } = req.body;
    const todo = todos.find((todo) => todo.id === id);

    if (!todo) {
      return res.status(404).send({ message: "Todo not found" });
    }

    todo.deleted = true;
    todo.updatedAt = Date.now();

    res.send({ message: "Todo deleted successfully" });
  },
];

//JWT
const privateKey = "salasona";

exports.getToken = (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: "Nimi on kohustuslik" });
  }

  const token = jwt.sign({ name }, privateKey, { expiresIn: "1h" });
  res.json({ token });
};

exports.verifyToken = (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.status(400).json({ message: "Token on kohustuslik" });
  }

  jwt.verify(token, privateKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token on kehtetu või aegunud" });
    }
    res.json({ message: "Token on korrektne", decoded });
  });
};
