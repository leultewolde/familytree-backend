import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const SECRET = process.env.JWT_SECRET || 'secret';

export const signup = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(400).json({ error: 'User already exists' });
    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({ data: { name, email, password: hashed } });
    res.json({ id: user.id, name: user.name });
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id }, SECRET);
    res.json({ token });
};