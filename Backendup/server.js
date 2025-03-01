const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const Experiment = require("./models/exp");
const Quiz = require("./models/quiz");

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));
;

// ✅ Corrected MongoDB Connection
mongoose.connect(
    'mongodb+srv://ADMIN:mZGN6SZitJnX4SBq@cluster0.erqqv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
)
.then(() => console.log("✅ Connected to database"))
.catch((err) => console.error("❌ Connection error", err));

// ✅ User Schema
const UserSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: String,
});
const User = mongoose.model("User", UserSchema);

// ✅ JWT Secret
const JWT_SECRET = "merllinyazhini";

// ✅ User Login
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        // Generate JWT Token
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// ✅ Store Experiment Data
app.post("/api/experiments", async (req, res) => {
    try {
        const experiments = req.body;
        await Experiment.insertMany(experiments);
        res.status(201).json({ message: "Experiment data stored successfully!" });
    } catch (error) {
        console.error("❌ Error storing experiment data:", error);
        res.status(500).json({ message: "Error storing experiment data", error });
    }
});

// ✅ Store Quiz Data
app.post("/api/quiz", async (req, res) => {
    try {
        const quizData = req.body;
        await Quiz.insertMany(quizData);
        res.status(201).json({ message: "Quiz data stored successfully!" });
    } catch (error) {
        console.error("❌ Error storing quiz data:", error);
        res.status(500).json({ message: "Error storing quiz data", error });
    }
});

// ✅ Fetch All Experiments
app.get("/api/experiments", async (req, res) => {
    try {
        const experiments = await Experiment.find();
        res.json(experiments);
    } catch (error) {
        res.status(500).json({ message: "Error fetching experiment data", error });
    }
});

// ✅ Fetch All Quiz Data
app.get("/api/quiz", async (req, res) => {
    try {
        const quizData = await Quiz.find();
        res.json(quizData);
    } catch (error) {
        res.status(500).json({ message: "Error fetching quiz data", error });
    }
});

// ✅ Start Server
const PORT = 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
