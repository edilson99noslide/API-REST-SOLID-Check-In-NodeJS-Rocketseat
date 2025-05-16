import { CheckIn } from '@/../generated/prisma';
import { CheckInsRepositoryInterface } from '@/repositories/check-ins-repository';
import { GymsRepositoryInterface } from '@/repositories/gyms-repository';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';

interface CheckInUseCaseRequest {
  userId: string;
  gymId: string;
  userLatitude: number;
  userLongitude: number;
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn
};

export class CheckInUseCase {
  constructor(
    private checkInsRepository: CheckInsRepositoryInterface,
    private gymsRepository: GymsRepositoryInterface
  ) {}

  async handle({ userId, gymId }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const gym = await this.gymsRepository.findById(gymId);

    if (!gym)
      throw new ResourceNotFoundError();

    const checkInOnSameDate = await this.checkInsRepository.findByUserIdOnDate(
      userId,
      new Date(),
    );

    if(checkInOnSameDate)
      throw new Error();

    const checkIn = await this.checkInsRepository.create({
      user_id: userId,
      gym_id: gymId,
    });

    return {
      checkIn
    };
  }
}