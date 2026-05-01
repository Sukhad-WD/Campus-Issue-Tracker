"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateIssueStatus = exports.getIssues = exports.createIssue = void 0;
const express_1 = require("express");
const Issue_js_1 = __importDefault(require("../models/Issue.js"));
const authMiddleware_js_1 = require("../middleware/authMiddleware.js");
// @desc    Create new issue
// @route   POST /api/issues
// @access  Private
const createIssue = async (req, res) => {
    const { title, category, description, location, priority, imageUrl } = req.body;
    const issue = await Issue_js_1.default.create({
        title,
        category,
        description,
        location,
        priority,
        imageUrl,
        reportedBy: req.user?._id,
    });
    if (issue) {
        res.status(201).json(issue);
    }
    else {
        res.status(400).json({ message: 'Invalid issue data' });
    }
};
exports.createIssue = createIssue;
// @desc    Get all issues (Admin or User's own)
// @route   GET /api/issues
// @access  Private
const getIssues = async (req, res) => {
    const { status, category, keyword } = req.query;
    const query = {};
    // If not admin, only show their own issues
    if (req.user?.role !== 'admin') {
        query.reportedBy = req.user?._id;
    }
    if (status)
        query.status = status;
    if (category)
        query.category = category;
    if (keyword) {
        query.$or = [
            { title: { $regex: keyword, $options: 'i' } },
            { description: { $regex: keyword, $options: 'i' } }
        ];
    }
    const issues = await Issue_js_1.default.find(query).populate('reportedBy', 'username email').sort({ createdAt: -1 });
    res.json(issues);
};
exports.getIssues = getIssues;
// @desc    Update issue status
// @route   PUT /api/issues/:id/status
// @access  Private/Admin
const updateIssueStatus = async (req, res) => {
    const issue = await Issue_js_1.default.findById(req.params.id);
    if (issue) {
        issue.status = req.body.status || issue.status;
        const updatedIssue = await issue.save();
        res.json(updatedIssue);
    }
    else {
        res.status(404).json({ message: 'Issue not found' });
    }
};
exports.updateIssueStatus = updateIssueStatus;
//# sourceMappingURL=issueController.js.map