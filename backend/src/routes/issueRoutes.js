"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const issueController_js_1 = require("../controllers/issueController.js");
const authMiddleware_js_1 = require("../middleware/authMiddleware.js");
const router = express_1.default.Router();
router.route('/')
    .post(authMiddleware_js_1.protect, issueController_js_1.createIssue)
    .get(authMiddleware_js_1.protect, issueController_js_1.getIssues);
router.route('/:id/status')
    .put(authMiddleware_js_1.protect, authMiddleware_js_1.admin, issueController_js_1.updateIssueStatus);
exports.default = router;
//# sourceMappingURL=issueRoutes.js.map