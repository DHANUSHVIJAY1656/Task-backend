const Project = require("../models/Project");


const createProject = async (req, res) => {
    const { project_name } = req.body;
    
    try {
        let project = await Project.findOne({ project_name });
        if (project) return res.status(400).json({ message: "Project name already exists" });

        project = new Project({ project_name });
        await project.save();

        res.status(201).json({ message: "Project created successfully", project });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};


const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};


const updateProject = async (req, res) => {
    const { id } = req.params;
    const { project_name, status } = req.body;

    try {
        let project = await Project.findById(id);
        if (!project) return res.status(404).json({ message: "Project not found" });

        if (project_name) project.project_name = project_name;
        if (status) project.status = status;

        await project.save();
        res.json({ message: "Project updated successfully", project });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

module.exports ={ createProject, getAllProjects, updateProject };