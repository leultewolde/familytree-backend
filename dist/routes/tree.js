import { Router } from 'express';
import { getTree, addMember } from '../controllers/tree.js';
import { authenticate } from '../middleware/auth.js';
const router = Router();
router.use(authenticate);
router.get('/', getTree);
router.post('/', addMember);
export default router;
