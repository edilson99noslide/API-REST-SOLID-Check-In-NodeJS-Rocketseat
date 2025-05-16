import { Gym } from 'generated/prisma';
import { GymsRepositoryInterface } from '@/repositories/gyms-repository';

export class InMemoryGymsRepository implements GymsRepositoryInterface {
  public items: Gym[] = [];

  async findById(id: string): Promise<Gym | null> {
    const gym = this.items.find(item => item.id === id);

    if(!gym) return null;

    return gym;
  }
}