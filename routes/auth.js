const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser"); 
const User = require("../models/User"); 
const dotenv = require("dotenv");

dotenv.config();

const router = express.Router();
router.use(cookieParser()); 


router.get("/", (req, res) => {
    res.json({ message: "Auth API working" });
});

//  Register Route .. 
router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ error: "Username, email, and password are required" });
        }
       
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Invalid email format" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ username, email, password: hashedPassword });

        res.status(201).json({ message: "User registered successfully", user: newUser });
    } 
    catch (err) {
        console.error("Error during registration:", err.message);
        
      
        if (err.code === 11000) {
            const duplicateField = err.keyPattern.username ? "Username" : "Email";
            return res.status(409).json({ error: `${duplicateField} already exists` });
        }
        
        res.status(500).json({ error: "Internal server error" });
    }
});

//  Login Route ...

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

      
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

      
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.cookie("token", token, {
            httpOnly: true,
            secure: false, 
            sameSite: "strict",
            maxAge: 3600000 
        });

        res.json({
            message: "Login successful",
            token,
            user: { id: user._id, username: user.username, email: user.email }
        });
    } 
    catch (err) {
        console.error("Error during login:", err.message);
        res.status(500).json({ error: "Internal server error" });
    }
});

// logout ..

router.post('/logout', (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });

        res.json({ message: 'Logout successful' });
    } catch (err) {
        console.error('Error during logout:', err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;
