import { UsersRepositoryInterface } from '@/repositories/users-repository';
import { User, Prisma } from 'generated/prisma';

export class InMemoryUsersRepository implements UsersRepositoryInterface {
  public items: User[] = [];

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find(item => item.email === email);

    if(!user) return null;

    return user;
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = {
      name: data.name,
      id: 'user-1',
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    }

    this.items.push(user);

    return user;
  }
}