const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const authenticateUser = (req, res, next) => {
    const token = req.cookies?.token;

    if (!token) {
        req.isAuthenticated = false;
        return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        req.isAuthenticated = true;
        next();
    } catch (err) {
        console.warn("Invalid token:", err.message);
        req.isAuthenticated = false;
        return res.status(403).json({ error: "Invalid token" });
    }
};

module.exports = { authenticateUser };
