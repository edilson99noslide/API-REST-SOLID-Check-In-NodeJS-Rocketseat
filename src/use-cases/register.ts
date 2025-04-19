import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';
import { UsersRepositoryInterface } from "@/repositories/users-repository";

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepositoryInterface) {}

  async handle({
    name,
    email,
    password,
  }: RegisterUseCaseRequest): Promise<void> {

    const userExists = await this.usersRepository.findByEmail(email);

    if(userExists) throw new Error("Já existe um usuário cadastrado com esse e-mail!");

    const password_hash = await hash(password, 6);

    await this.usersRepository.create({
      name,
      email,
      password_hash,
    });
  }
}