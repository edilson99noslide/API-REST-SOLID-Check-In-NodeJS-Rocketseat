import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';

interface RegisterUseCaseParams {
  name: string;
  email: string;
  password: string;
}

export class RegisterUseCase {
  private userRepository: any;

  constructor(private usersRepository: any) {}

  async handle({
    name,
    email,
    password,
  }: RegisterUseCaseParams): Promise<void> {
    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if(userExists) throw new Error("Já existe um usuário cadastrado com esse e-mail!");

    const password_hash = await hash(password, 6);

    await this.usersRepository.create({
      name,
      email,
      password_hash,
    });
  }
}