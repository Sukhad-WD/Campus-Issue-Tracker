import express from 'express';
import { createIssue, getIssues, updateIssueStatus } from '../controllers/issueController';
import { protect, admin } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/')
  .post(protect, createIssue)
  .get(protect, getIssues);

router.route('/:id/status')
  .put(protect, admin, updateIssueStatus);

export default router;
