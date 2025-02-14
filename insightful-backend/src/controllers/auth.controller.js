const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const supabase = require("../services/supabase");

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRY = "7d";

const signup = async (req, res) => {
    try {
        const { email, password } = req.body;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const { data, error } = await supabase
            .from("users")
            .insert([{ email, password: hashedPassword }]);

        if (error) {
            console.error("Supabase Insert Error:", error);
            return res.status(500).json({ error: error.message || "Signup failed" });
        }

        const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: JWT_EXPIRY });

        res.status(201).json({ message: "User registered successfully", token });
    } catch (err) {
        console.error("Signup Error:", err);
        res.status(500).json({ error: "Signup failed" });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const { data, error } = await supabase
            .from("users")
            .select("*")
            .eq("email", email)
            .single();

        if (!data || error) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, data.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "7d" });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production" ? true : false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({ message: "Login successful" });
    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({ error: "Login failed" });
    }
};

const verify = (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: "User not authenticated" });
    }

    res.status(200).json({ user: req.user });
};

const logout = (req, res) => {
    res.clearCookie("token", { httpOnly: true, secure: process.env.NODE_ENV === "production" });
    res.status(200).json({ message: "Logged out" })
}

module.exports = { 
    signup, 
    login, 
    verify, 
    logout 
};