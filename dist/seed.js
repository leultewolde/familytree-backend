import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();
async function main() {
    const hashed = await bcrypt.hash('password123', 10);
    await prisma.user.upsert({
        where: { email: 'leul@family.com' },
        update: {},
        create: {
            name: 'Leul',
            email: 'leul@family.com',
            password: hashed
        }
    });
    console.log('Seeded default user');
}
main().finally(() => prisma.$disconnect());
