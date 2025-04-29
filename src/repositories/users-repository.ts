import { Prisma, User } from '@/lib/prisma';

export interface UsersRepositoryInterface {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(data: Prisma.UserCreateInput): Promise<User>;
}