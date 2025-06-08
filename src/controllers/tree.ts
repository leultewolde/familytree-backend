import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getTree = async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const persons = await prisma.person.findMany({ where: { addedById: userId } });
    res.json(persons);
};

export const currentMember = async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const person = await prisma.person.findUnique({ where: { id: userId } });
    res.json({ name: person?.name });
}

export const addMember = async (req: Request, res: Response) => {
    const { name, relation, pin } = req.body;
    const userId = (req as any).user.id;
    const person = await prisma.person.create({
        data: {
            name,
            relation,
            pin,
            addedById: userId,
            registered: false
        }
    });
    res.json(person);
}