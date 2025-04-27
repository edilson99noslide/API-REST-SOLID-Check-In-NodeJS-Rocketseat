import { UsersRepositoryInterface } from '@/repositories/users-repository';
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error';
import bcrypt from 'bcryptjs/umd/types';
import { User } from '@/../generated/prisma';

interface AuthenticateRequest {
  email: string;
  password: string;
}

interface AuthenticateResponse {
  user: User
};

export class AuthenticateUseCase {
  constructor(private userRepository: UsersRepositoryInterface) {}

  async handler({ email, password }: AuthenticateRequest): Promise<AuthenticateResponse> {
    const user = await this.userRepository.findByEmail(email);

    if(!user) throw new InvalidCredentialsError();

    const doesPasswordMatches = await bcrypt.compare(password, user.password_hash);

    if(!doesPasswordMatches) throw new InvalidCredentialsError();

    return {
      user
    };
  }
}