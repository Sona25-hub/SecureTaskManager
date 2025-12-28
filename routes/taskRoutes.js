const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const authMiddleware = require("../middleware/authMiddleware");

// ================= GET TASKS =================
router.get("/", authMiddleware, async (req, res) => {
  const tasks = await Task.find({ user: req.user.userId }).sort({ createdAt: 1 });
  res.json(tasks);
});

// ================= ADD TASK =================
router.post("/", authMiddleware, async (req, res) => {
  const { title, description, dueDate, reminderAt } = req.body;

  const task = await Task.create({
    user: req.user.userId,
    title,
    description,
    dueDate,
    reminderAt
  });

  res.status(201).json({ task });
});

// ================= UPDATE TASK =================
router.put("/:id", authMiddleware, async (req, res) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, user: req.user.userId },
    req.body,
    { new: true }
  );

  res.json(task);
});

// ================= DELETE TASK =================
router.delete("/:id", authMiddleware, async (req, res) => {
  await Task.findOneAndDelete({
    _id: req.params.id,
    user: req.user.userId
  });

  res.json({ message: "Task deleted" });
});

module.exports = router;
