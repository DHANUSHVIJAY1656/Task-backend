const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { models } = require("mongoose");

const registercontroller = async (req, res) => {
    const { name, email, password, role, createdBy } = req.body;
    
    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "User already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({ name, email, password: hashedPassword, role, createdBy });
        await user.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

const logincontroller = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
        // console.log(token);
        // console.log(typeof(token));
        res.json( {message: "Login successful", token});
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server error" });
    }
};


const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.json(users);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server error" });
    }
};

const updateUserRole = async (req, res) => {
    const { userId, role } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        user.role = role;
        await user.save();

        res.json({ message: "User role updated successfully" });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server error" });
    }
};

const getUsersByRole = async (req, res) => {
    try {
        const { role } = req.params;

        if (!role) {
            return res.status(400).json({ message: "Role parameter is missing" });
        }

        const formattedRole = role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();

        if (!["Client", "Employee", "Manager", "Admin"].includes(formattedRole)) {
            return res.status(400).json({ message: "Invalid role" });
        }

        const users = await User.find({ role: formattedRole }).select("-password");
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};



module.exports = {registercontroller ,logincontroller , getAllUsers ,updateUserRole ,getUsersByRole};