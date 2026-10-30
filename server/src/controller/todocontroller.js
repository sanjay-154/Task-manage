const todoservices = require("../services/todoservices");

const getAllTodos = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);

    const todos = await todoservices.getAllTodo(page);

    res.status(200).json({
      success: true,
      data: todos,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getTodosById = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await todoservices.getTodoById(id);
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }
    return res.status(200).json({
      success: true,
      data: todo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const createTodos = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (typeof title !== "string" || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }

    const todo = await todoservices.createTodo({
      title: title.trim(),
      description: description,
    });

    return res.status(201).json({
      success: true,
      data: todo,
      message: "Todo create successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateTodos = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    const todos = await todoservices.updateTodo(id, {
      ...(title !== undefined && { title }),
      ...(description !== undefined && { description }),
      ...(completed !== undefined && { completed }),
    });
    if (!todos) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: todos,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteTodos = async (req, res) => {
  try {
    const { id } = req.params;
    const todos = await todoservices.deleteTodo(id);

    if (!todos) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Todo deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAllTodos,
  getTodosById,
  createTodos,
  updateTodos,
  deleteTodos,
};
