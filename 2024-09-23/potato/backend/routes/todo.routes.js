const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todo.controllers");

router.get("/", todoController.read);
router.post("/", todoController.create);
router.put("/", todoController.update);
router.delete("/", todoController.delete);

//JWT
router.get("/token", todoController.getToken);
router.post("/verify", todoController.verifyToken);

module.exports = router;