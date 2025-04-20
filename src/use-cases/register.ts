import { hash } from 'bcryptjs';
import { UsersRepositoryInterface } from '@/repositories/users-repository';
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error';
import { User } from "@/../generated/prisma";

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepositoryInterface) {}

  async handle({
    name,
    email,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {

    const userExists = await this.usersRepository.findByEmail(email);

    if(userExists) throw new UserAlreadyExistsError();

    const password_hash = await hash(password, 6);

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    });

    return {
      user,
    }
  }
}