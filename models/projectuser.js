const mongoose = require("mongoose");

const ProjectUserSchema = new mongoose.Schema({
    project_id: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    role_in_project: { 
        type: String, 
        enum: ["Employee", "Client"], 
        required: true 
    },
    assigned_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("ProjectUser", ProjectUserSchema);
