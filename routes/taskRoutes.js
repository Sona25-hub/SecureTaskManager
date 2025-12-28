const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const { protect } = require("../middleware/authMiddleware");

// Get all tasks for logged-in user
router.get("/", protect, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.userId });
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
});

// Add new task
router.post("/", protect, async (req, res) => {
  try {
    const { title, description, dueDate, reminderAt } = req.body; // updated to match frontend
    const task = await Task.create({
      user: req.user.userId,
      title,
      description,
      dueDate,
      reminderAt
    });
    res.status(201).json({ task }); // wrap inside { task: ... } for frontend
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create task" });
  }
});

// Update task
router.put("/:id", protect, async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.userId },
      req.body,
      { new: true }
    );
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update task" });
  }
});

// Delete task
router.delete("/:id", protect, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId
    });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete task" });
  }
});

module.exports = router;
