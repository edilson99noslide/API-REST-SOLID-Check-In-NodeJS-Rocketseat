import { prisma } from '@/lib/prisma';
import { Prisma, User } from '@/lib/prisma';
import { UsersRepositoryInterface } from '@/repositories/users-repository';

export class PrismaUsersRepository implements UsersRepositoryInterface {
  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    return user;
  }
  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = await prisma.user.create({
      data
    });

    return user;
  }
}