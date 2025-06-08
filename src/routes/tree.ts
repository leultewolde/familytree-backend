import { Router } from 'express';
import { getTree, addMember } from '../controllers/tree';
import { authenticate } from '../middleware/auth';

const router = Router();
router.use(authenticate);
router.get('/', getTree);
router.post('/', addMember);
export default router;