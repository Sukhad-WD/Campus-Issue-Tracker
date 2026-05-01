import { Response } from 'express';
import Issue from '../models/Issue';
import { AuthRequest } from '../middleware/authMiddleware';

// @desc    Create new issue
// @route   POST /api/issues
// @access  Private
export const createIssue = async (req: AuthRequest, res: Response) => {
  const { title, category, description, location, priority, imageUrl } = req.body;

  const issue = await Issue.create({
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
  } else {
    res.status(400).json({ message: 'Invalid issue data' });
  }
};

// @desc    Get all issues (Admin or User's own)
// @route   GET /api/issues
// @access  Private
export const getIssues = async (req: AuthRequest, res: Response) => {
  const { status, category, keyword } = req.query;
  
  const query: any = {};

  // If not admin, only show their own issues
  if (req.user?.role !== 'admin') {
    query.reportedBy = req.user?._id;
  }

  if (status) query.status = status;
  if (category) query.category = category;
  if (keyword) {
    query.$or = [
      { title: { $regex: keyword, $options: 'i' } },
      { description: { $regex: keyword, $options: 'i' } }
    ];
  }

  const issues = await Issue.find(query).populate('reportedBy', 'username email').sort({ createdAt: -1 });
  res.json(issues);
};

// @desc    Update issue status
// @route   PUT /api/issues/:id/status
// @access  Private/Admin
export const updateIssueStatus = async (req: AuthRequest, res: Response) => {
  const issue = await Issue.findById(req.params.id);

  if (issue) {
    issue.status = req.body.status || issue.status;
    const updatedIssue = await issue.save();
    res.json(updatedIssue);
  } else {
    res.status(404).json({ message: 'Issue not found' });
  }
};
