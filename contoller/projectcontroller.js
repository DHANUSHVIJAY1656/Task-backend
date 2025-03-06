const Project = require("../models/Project");

const createProject = async (req, res) => {
    const { project_name } = req.body;
    const created_by = req.user.id; 

    try {
        let project = await Project.findOne({ project_name });
        if (project) return res.status(400).json({ message: "Project name already exists" });

        project = new Project({ project_name, created_by });
        await project.save();

        res.status(201).json({ message: "Project created successfully", project });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};

const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find().populate("created_by", "name email"); 
        res.json(projects);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};

const updateProject = async (req, res) => {
    const { Id } = req.params;
    const { project_name, status } = req.body;

    try {
        let project = await Project.findById(Id);
        if (!project) return res.status(404).json({ message: "Project not found" });

        if (project_name) project.project_name = project_name;
        if (status) project.status = status;


        if (!project.created_by) {
            return res.status(400).json({ message: "'created_by' field is required" });
        }

        await project.save();
        res.json({ message: "Project updated successfully", project });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};


module.exports = { createProject, getAllProjects, updateProject };
