import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';

interface RegisterServiceParams {
  name: string;
  email: string;
  password: string;
}

export async function registerService({
    name,
    email,
    password,
  }: RegisterServiceParams): Promise<void> {
  const userExists = await prisma.user.findUnique({
    where: { email },
  });

  if(userExists) throw new Error("Já existe um usuário cadastrado com esse e-mail!");

  const password_hash = await hash(password, 6);

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash,
    }
  });
}