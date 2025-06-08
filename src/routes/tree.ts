import { Router } from 'express';
import { getTree, addMember, currentMember } from '../controllers/tree.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();
router.use(authenticate);
router.get('/', getTree);
router.post('/', addMember);
router.get('/current', currentMember);

export default router;