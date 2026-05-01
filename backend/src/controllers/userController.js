"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authUser = exports.registerUser = void 0;
const express_1 = require("express");
const User_js_1 = __importDefault(require("../models/User.js"));
const generateToken_js_1 = __importDefault(require("../utils/generateToken.js"));
// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = async (req, res) => {
    const { username, email, password, role } = req.body;
    const userExists = await User_js_1.default.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }
    const user = await User_js_1.default.create({
        username,
        email,
        password,
        role: role || 'student',
    });
    if (user) {
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            token: (0, generateToken_js_1.default)(user._id),
        });
    }
    else {
        res.status(400).json({ message: 'Invalid user data' });
    }
};
exports.registerUser = registerUser;
// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User_js_1.default.findOne({ email });
    if (user && (await user.comparePassword(password))) {
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            token: (0, generateToken_js_1.default)(user._id),
        });
    }
    else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
};
exports.authUser = authUser;
//# sourceMappingURL=userController.js.map