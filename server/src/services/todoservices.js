const db = require("../models");
const Todo = db.Todo;

if (!Todo) {
  throw new Error("Todo model was not initialized");
}

const getAllTodo = async (page = 1) => {
  const limit = 5;
  page = Math.max(1, parseInt(page, 10) || 1);
  const offset = (page - 1) * limit;

  const { count, rows } = await Todo.findAndCountAll({
    order: [["id", "DESC"]],
    limit,
    offset,
  });

  return {
    todos: rows,
    hasMore: offset + rows.length < count,
    nextPage: offset + rows.length < count ? page + 1 : null,
    currentPage: page,
    totalPages: Math.ceil(count / limit),
    totalTodos: count,
  };
};

const getTodoById = async (id) => {
  return await Todo.findByPk(id);
};

const createTodo = async (todoData) => {
  return await Todo.create({
    title: todoData.title,
    description: todoData.description || null,
    completed: false,
  });
};

const updateTodo = async (id, todoData) => {
  const todo = await Todo.findByPk(id);

  if (!todo) return null;

  await todo.update({
    ...(todoData.title !== undefined && { title: todoData.title }),
    ...(todoData.description !== undefined && {
      description: todoData.description,
    }),
    ...(todoData.completed !== undefined && {
      completed: todoData.completed,
    }),
  });

  return todo;
};

const deleteTodo = async (id) => {
  const todo = await Todo.findByPk(id);

  if (!todo) return null;

  await todo.destroy();
  return todo;
};

module.exports = {
  getAllTodo,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
};
