const express = require("express");
const { registercontroller, logincontroller, getAllUsers, updateUserRole } = require("../contoller/authController");
const { route } = require("../App");
const { authMiddleware, adminMiddleware } = require("../middlerware/authmiddleware");
const { createProject, getAllProjects, updateProject } = require("../contoller/projectcontroller");
const { assignUserToProject, getAllProjectUsers, getProjectUsers } = require("../contoller/projectusercontroller");

const router = express.Router();

router.post("/register", registercontroller);
router.post("/login", logincontroller);
router.get("/users" ,authMiddleware, adminMiddleware, getAllUsers);
router.put("/update-role",authMiddleware,adminMiddleware, updateUserRole);

//project
router.post("/create", authMiddleware , adminMiddleware, createProject);
router.get("/get", authMiddleware,adminMiddleware,getAllProjects);
router.put("/put/:id", authMiddleware,adminMiddleware, updateProject);

//projectuser
router.post("/projectuser", authMiddleware, adminMiddleware, assignUserToProject);
router.get("/projectusers", getAllProjectUsers);
router.get("/projectdetails/:projectid",getProjectUsers);

module.exports = router;