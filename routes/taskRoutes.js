const express = require("express");
const Task = require("../models/Task");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * CREATE TASK
 */
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const task = new Task({
      user: req.user.userId,
      title,
      description,
    });

    await task.save();

    res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

/**
 * GET ALL TASKS (Logged-in user only)
 */
router.get("/", authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.userId }).sort({
      createdAt: -1,
    });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * UPDATE TASK (mark complete / edit)
 */
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user.userId,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.completed =
      req.body.completed !== undefined
        ? req.body.completed
        : task.completed;

    await task.save();

    res.json({
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
  console.error("UPDATE TASK ERROR:", error);
  res.status(500).json({
    message: "Server error",
    error: error.message,
  });
}
});

/**
 * DELETE TASK
 */
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id.trim(),
      user: req.user.userId,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("DELETE TASK ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});

