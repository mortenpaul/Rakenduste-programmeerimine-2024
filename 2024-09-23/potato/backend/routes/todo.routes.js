const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todo.controllers");

router.get("/", todoController.read);
router.post("/", todoController.create);
router.put("/", todoController.update);
router.delete("/", todoController.delete);

module.exports = router;