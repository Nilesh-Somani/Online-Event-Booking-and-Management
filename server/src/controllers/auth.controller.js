import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

const isFirstAdmin = async () => {
    const adminCount = await User.countDocuments({ role: "admin" });
    return adminCount === 0;
};

export const login = async (req, res) => {
    const { identifier, password } = req.body;

    const user = await User.findOne({
        $or: [{ email: identifier }, { userId: identifier }],
    });

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({
        token: generateToken(user),
        user,
    });
};

export const register = async (req, res) => {
    const {
        firstName,
        middleName,
        lastName,
        email,
        userId,
        password,
        role = "user",
    } = req.body;

    const exists = await User.findOne({ $or: [{ email }, { userId }] });
    if (exists) {
        return res.status(400).json({ message: "User already exists" });
    }

    if (role === "admin") {
        const allow = await isFirstAdmin();
        if (!allow) {
            return res.status(403).json({ message: "Admin creation restricted" });
        }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        email,
        userId,
        password: hashedPassword,
        role,
        profileStatus: "incomplete",
        profile: {
            firstName,
            middleName,
            lastName,
        },
    });

    res.status(201).json({
        token: generateToken(user),
        user,
    });
};

export const logout = async (req, res) => {
    res.json({ message: "Logged out successfully" });
};

export const checkAvailability = async (req, res) => {
    const { field, value } = req.query;

    if (!["email", "userId"].includes(field)) {
        return res.status(400).json({ message: "Invalid field" });
    }

    const exists = await User.exists({ [field]: value });
    res.json({ available: !exists });
};