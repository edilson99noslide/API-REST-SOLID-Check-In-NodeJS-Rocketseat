import { Gym } from '@/lib/prisma';

export interface GymsRepositoryInterface {
  findById(id: string): Promise<Gym | null>;
}