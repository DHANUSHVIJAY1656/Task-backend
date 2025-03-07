const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    task_name: { type: String, required: true },
    task_description: { type: String },
    task_doc: { type: String }, 
    assigned_to: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true  },
    assigned_by: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    deadline: { type: Date, required: true },
    project_id: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
    status: {
      type: String,
      enum: ["To Do", "In Progress", "Completed"],
      default: "To Do"
    },
    priority: {
      type: String,
      enum: ["High", "Medium", "Low"],
      default: "Medium"
    },
    comments: [
      {
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        comment: { type: String, required: true },
        created_at: { type: Date, default: Date.now }
      }
    ],
    history: [
      {
        updated_by: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        previous_status: { type: String },
        new_status: { type: String },
        updated_at: { type: Date, default: Date.now }
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);
