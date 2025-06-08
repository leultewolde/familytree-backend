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

export const verifyName = async (req: Request, res: Response) => {
    const { name } = req.body;
    const person = await prisma.person.findFirst({ where: { name, registered: false } });
    if (!person) return res.status(404).json({ error: 'Name not found' });
    res.json({ ok: true });
}

export const verifyPin = async (req: Request, res: Response) => {
    const { name, pin } = req.body;
    const person = await prisma.person.findFirst({ where: { name, pin, registered: false } });
    if (!person) return res.status(403).json({ error: 'Invalid PIN' });
    res.json({ ok: true });
}

export const completeRegistration = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    const person = await prisma.person.findFirst({ where: { name, registered: false } });
    if (!person) return res.status(404).json({ error: 'Name not found' });
    const hashed = await bcrypt.hash(password, 10);
    await prisma.person.update({
        where: { id: person.id },
        data: { email, password: hashed, registered: true }
    });
    res.json({ ok: true });
}

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const person = await prisma.person.findUnique({ where: { email } });
    if (!person || !person.password || !(await bcrypt.compare(password, person.password))) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: person.id, name: person.name }, SECRET);
    res.json({ token });
}