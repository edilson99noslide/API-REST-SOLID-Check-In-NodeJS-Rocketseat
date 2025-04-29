import { UsersRepositoryInterface } from '@/repositories/users-repository';
import { User } from '@/../generated/prisma';
import bcrypt from 'bcryptjs';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';

interface GetUserProfileUseCaseRequest {
  userId: string;
}

interface GetUserProfileUseCaseResponse {
  user: User
};

export class GetUserProfileUseCase {
  constructor(private userRepository: UsersRepositoryInterface) {}

  async handle({ userId }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
    const user = await this.userRepository.findById(userId);

    if(!user) throw new ResourceNotFoundError();

    return {
        user
    };
  }
}