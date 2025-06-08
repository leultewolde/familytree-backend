import { Router } from 'express';
import {
    login,
    signup,
    verifyPin,
    verifyName,
    completeRegistration
} from '../controllers/auth.js';

const router = Router();
router.post('/signup', signup);
router.post('/verify-name', verifyName);
router.post('/verify-pin', verifyPin);
router.post('/complete-registration', completeRegistration);
router.post('/login', login);

export default router;