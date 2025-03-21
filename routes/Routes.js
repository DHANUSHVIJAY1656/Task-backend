const express = require("express");
const { registercontroller, logincontroller, getAllUsers, updateUserRole, getUsersByRole } = require("../contoller/authController");
const { route } = require("../App");
const { authMiddleware, adminMiddleware } = require("../middlerware/authmiddleware");
const { createProject, getAllProjects, updateProject } = require("../contoller/projectcontroller");
const { assignUserToProject, getAllProjectUsers, getProjectUsers } = require("../contoller/projectusercontroller");
const { createTask, addCommentToTask, getTaskDetails, getAllTasks,  GetUserAssignedTasks } = require("../contoller/taskController");

const router = express.Router();

router.post("/register", registercontroller);
router.post("/login", logincontroller);
router.get("/users" ,authMiddleware, adminMiddleware, getAllUsers);
router.put("/update-role",authMiddleware,adminMiddleware, updateUserRole);
router.get("/users/role/:role" ,authMiddleware,adminMiddleware,getUsersByRole);

//project
router.post("/project", authMiddleware , adminMiddleware, createProject);
router.get("/projects", authMiddleware,adminMiddleware,getAllProjects);
router.put("/update/:projectId", authMiddleware,adminMiddleware, updateProject);

//projectuser
router.post("/projectuser", authMiddleware, adminMiddleware, assignUserToProject);
router.get("/projectusers", authMiddleware ,getAllProjectUsers);
router.get("/project-users/:projectId", authMiddleware, getProjectUsers);

//task
router.post("/tasks", authMiddleware, createTask);
router.post("/tasks/:taskId/comments",authMiddleware, addCommentToTask);
router.get("/tasks/:taskId",authMiddleware, getTaskDetails);
router.get("/alltask" , authMiddleware , getAllTasks);
router.get("/tasks/assigned/:userId" , authMiddleware , GetUserAssignedTasks);

module.exports = router;