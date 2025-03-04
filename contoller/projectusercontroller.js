const ProjectUser = require("../models/projectuser");
const User = require("../models/User");
const Project = require("../models/Project");


const assignUserToProject = async (req, res) => {
    const { project_id, user_id, role_in_project } = req.body;
    const created_by = req.user.id; 

    try {
        const project = await Project.findById(project_id);
        const user = await User.findById(user_id);
        const creator = await User.findById(created_by);

        if (!project) return res.status(404).json({ message: "Project not found" });
        if (!user) return res.status(404).json({ message: "User not found" });
        if (!creator) return res.status(404).json({ message: "Creator (assigner) not found" });

        const assignment = new ProjectUser({ project_id, user_id, role_in_project, created_by });
        await assignment.save();

        res.status(201).json({ message: "User assigned to project successfully", assignment });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};


const getAllProjectUsers = async (req, res) => {
    try {
        const assignments = await ProjectUser.find()
            .populate("project_id user_id created_by", "project_name name email");

        res.json(assignments);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};


const getProjectUsers = async (req, res) => {
    const { projectId } = req.params;

    try {
        const project = await Project.findById(projectId);
        if (!project) return res.status(404).json({ message: "Project not found" });

        const users = await ProjectUser.find({ project_id: projectId })
            .populate("user_id created_by", "name email role");

        const clients = users.filter(user => user.role_in_project === "Client");
        const employees = users.filter(user => user.role_in_project === "Employee");

        res.json({ project_name: project.project_name, clients, employees });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};



module.exports = {assignUserToProject, getAllProjectUsers, getProjectUsers};