const app = require("./App");
const connectDB = require("./config/db"); // MongoDB connection function
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB here
connectDB();

// Start the server
app.listen(PORT, () => {
  console.clear();
  console.log(`Server running on port ${PORT}`);
});
