const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const jwt = require("jsonwebtoken");

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "client")));
const cors = require('cors');
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

// Routes
app.use("/api", authRoutes);
app.use("/api/tasks", taskRoutes);

// Middleware to protect dashboard
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'] || req.query.token;
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.redirect('/login.html');

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.redirect('/login.html');
        req.user = user; // { userId: ... }
        next();
    });
}

// Serve dashboard only if authenticated
app.get("/dashboard", authenticateToken, (req, res) => {
    res.sendFile(path.join(__dirname, "client", "dashboard.html"));
});

// Protected route to get current user info
app.get("/api/protected", authenticateToken, async (req, res) => {
    const User = require("./models/User");
    const user = await User.findById(req.user.userId).select("-password");
    res.json({ user });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
