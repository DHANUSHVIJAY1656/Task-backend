const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
    project_name: { type: String, required: true, unique: true },
    status: { type: String, enum: ["Pending", "In Progress", "Completed"], default: "Pending" },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Project", ProjectSchema);
