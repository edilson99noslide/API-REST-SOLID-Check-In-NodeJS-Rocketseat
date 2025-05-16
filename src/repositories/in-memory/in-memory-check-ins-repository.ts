import { Prisma, CheckIn } from 'generated/prisma';
import { randomUUID } from 'node:crypto';
import { CheckInsRepositoryInterface } from '@/repositories/check-ins-repository';
import dayjs from 'dayjs';

export class InMemoryCheckInsRepository implements CheckInsRepositoryInterface  {
  public items: CheckIn[] = [];

  async findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null> {
    const startOfTheDay = dayjs(date).startOf('date');
    const endOfTheDay = dayjs(date).endOf('date');

    const checkInOnSameDate = this.items.find(
      (checkIn) => {
        const checkInDate = dayjs(checkIn.created_at);
        const isOnSameDate =
          dayjs(checkIn.created_at).isAfter(startOfTheDay) && dayjs(checkIn.created_at).isBefore(endOfTheDay);

        return checkIn.user_id === userId && isOnSameDate;
      }
    );

    if(!checkInOnSameDate) return null;

    return checkInOnSameDate;
  }

  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      is_validated: data.is_validated ? new Date(data.is_validated) : null,
      created_at: new Date(),
    }

    this.items.push(checkIn);

    return checkIn;
  }
}