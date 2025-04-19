import { Prisma, User } from '@/lib/prisma';

export interface UsersRepositoryInterface {
  findByEmail(email: string): Promise<User | null>;
  create(data: Prisma.UserCreateInput): Promise<User>;
}