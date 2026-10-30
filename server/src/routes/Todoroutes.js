
const todoController = require("../controller/todocontroller");
const express = require("express");

const router = express.Router();

 router.get("/",todoController.getAllTodos);
 router.get("/:id",todoController.getTodosById);
 router.post("/",todoController.createTodos);
 router.put("/:id",todoController.updateTodos);
 router.delete("/:id",todoController.deleteTodos);

 module.exports=router;
