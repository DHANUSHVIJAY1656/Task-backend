const Task = require("../models/Task");
const User = require("../models/User");
const Project = require("../models/Project");
const mongoose = require("mongoose");

const createTask = async (req, res) => {
  try {
    let {
      task_name,
      task_description,
      task_doc,
      assigned_to,
      assigned_by,
      deadline,
      project_id,
      priority,
    } = req.body;

    if (!mongoose.Types.ObjectId.isValid(assigned_to)) {
      return res.status(400).json({ message: "Invalid assigned_to ID" });
    }
    if (!mongoose.Types.ObjectId.isValid(assigned_by)) {
      return res.status(400).json({ message: "Invalid assigned_by ID" });
    }
    if (!mongoose.Types.ObjectId.isValid(project_id)) {
      return res.status(400).json({ message: "Invalid project_id" });
    }

    assigned_to = new mongoose.Types.ObjectId(assigned_to);
    assigned_by = new mongoose.Types.ObjectId(assigned_by);
    project_id = new mongoose.Types.ObjectId(project_id);

    const assignedUser = await User.findById(assigned_to);
    if (!assignedUser) {
      return res.status(404).json({ message: "Assigned user not found" });
    }

    const project = await Project.findById(project_id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const task = new Task({
      task_name,
      task_description,
      task_doc,
      assigned_to,
      assigned_by,
      deadline,
      project_id,
      priority,
    });

    await task.save();
    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

const addCommentToTask = async (req, res) => {
  const { taskId } = req.params;
  const { user_id, comment } = req.body;

  try {
    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: "Task not found" });

    task.comments.push({ user_id, comment });
    await task.save();

    res.status(201).json({ message: "Comment added successfully", task });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

const getTaskDetails = async (req, res) => {
  const { taskId } = req.params;

  try {
    const task = await Task.findById(taskId)
      .populate("assigned_to", "name email")
      .populate("assigned_by", "name email")
      .populate("project_id", "project_name")
      .populate("comments.user_id", "name email");

    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json(task);
  } catch (error) {
    console.error("Error fetching task details:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("assigned_to", "name email")
      .populate("assigned_by", "name email")
      .populate("project_id", "project_name");
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { createTask, addCommentToTask, getTaskDetails, getAllTasks };
