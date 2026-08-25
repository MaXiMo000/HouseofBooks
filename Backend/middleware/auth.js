import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is missing from the environment. Refusing to start without it.");
}

/** Populates req.user from a Bearer token, or rejects. */
export const verifyToken = (req, res, next) => {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }
    try {
        req.user = jwt.verify(header.split(" ")[1], JWT_SECRET);
        next();
    } catch {
        return res.status(403).json({ message: "Invalid or expired token." });
    }
};

/**
 * Admin only. Use after verifyToken.
 *
 * The admin write routes (/books/add, /books/:id) previously had no check of
 * any kind -- anyone on the internet could add or delete books.
 */
export const requireAdmin = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Access denied. Admin only." });
    }
    next();
};
