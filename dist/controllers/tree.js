import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export const getTree = async (req, res) => {
    const userId = req.user.id;
    const persons = await prisma.person.findMany({ where: { addedById: userId } });
    res.json(persons);
};
export const addMember = async (req, res) => {
    const userId = req.user.id;
    const { name, relation } = req.body;
    const person = await prisma.person.create({
        data: {
            name,
            relation,
            addedById: userId
        }
    });
    res.json(person);
};
