import {NextFunction, Request, Response} from 'express';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'secret';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    try {
        (req as any).user = jwt.verify(token, SECRET);
        next();
    } catch {
        res.sendStatus(403);
    }
};