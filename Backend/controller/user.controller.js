import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is missing from the environment. Refusing to start without it.");
}

const TOKEN_TTL = "2h";

const issueToken = (user) =>
    jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: TOKEN_TTL });

const publicUser = (user) => ({
    _id: user._id,
    fullname: user.fullname,
    email: user.email,
    role: user.role,
});

export const signup = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;
        if (!fullname || !email || !password) {
            return res.status(400).json({ message: "fullname, email and password are required" });
        }
        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashPassword = await bcryptjs.hash(password, 10);
        // `role` is deliberately NOT taken from req.body -- otherwise anyone
        // could sign up as an admin. Promotion happens via `npm run seed:admin`.
        const createdUser = await new User({
            fullname,
            email,
            password: hashPassword,
        }).save();

        res.status(201).json({
            message: "User created successfully",
            user: publicUser(createdUser),
            token: issueToken(createdUser),
        });
    } catch (error) {
        console.error("Signup error:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "email and password are required" });
        }

        const user = await User.findOne({ email });

        // The null check has to come BEFORE bcrypt.compare. It used to run
        // after, so an unknown email threw on user.password and returned 500
        // while a known email returned 400 -- which told an attacker which
        // addresses exist. Both cases answer identically now.
        if (!user || !(await bcryptjs.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        res.status(200).json({
            message: "Login successful",
            user: publicUser(user),
            token: issueToken(user),
        });
    } catch (error) {
        console.error("Login error:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};
