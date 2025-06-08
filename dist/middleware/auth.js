import jwt from 'jsonwebtoken';
const SECRET = process.env.JWT_SECRET || 'secret';
export const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader)
        return res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    try {
        req.user = jwt.verify(token, SECRET);
        next();
    }
    catch {
        res.sendStatus(403);
    }
};
