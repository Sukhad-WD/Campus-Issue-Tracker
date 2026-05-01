import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware.js';
export declare const createIssue: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getIssues: (req: AuthRequest, res: Response) => Promise<void>;
export declare const updateIssueStatus: (req: AuthRequest, res: Response) => Promise<void>;
//# sourceMappingURL=issueController.d.ts.map