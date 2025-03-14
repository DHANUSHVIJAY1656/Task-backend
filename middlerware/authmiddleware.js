const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
        return res.status(401).json({ message: "Access Denied. No token provided." });
    }

    const token = authHeader.split(" ")[1]; 

    if (!token) {
        return res.status(401).json({ message: "Access Denied. Invalid token format." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error.message);
        res.status(400).json({ message: "Invalid Token" });
    }
};

const adminMiddleware = (req, res, next) => {
    if (req.user.role !== "Admin") {
        return res.status(403).json({ message: "Access Denied" });
    }
    next();
};




module.exports ={authMiddleware, adminMiddleware }