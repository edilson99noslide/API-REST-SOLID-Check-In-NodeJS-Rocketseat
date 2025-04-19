import { prisma } from '@/lib/prisma';
import { Prisma } from '@/lib/prisma';

export class PrismaUsersRepository {
  async create(data: Prisma.UserCreateInput): Promise<Prisma.UserCreateInput> {
    const user = await prisma.user.create({
      data
    });

    return user;
  }
}