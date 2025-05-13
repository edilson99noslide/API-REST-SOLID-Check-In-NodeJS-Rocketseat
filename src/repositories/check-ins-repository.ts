import { CheckIn, Prisma } from '@/lib/prisma';

export interface CheckInsRepository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
}