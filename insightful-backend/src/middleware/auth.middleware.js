const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        req.isAuthenticated = false;
        return next();
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        req.isAuthenticated = true;
    } catch (err) {
        console.warn("Invalid token:", err.message);
        req.isAuthenticated = false;
    }

    next();
};

module.exports = { authenticateUser };