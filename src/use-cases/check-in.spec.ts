import { expect, describe, test, beforeEach, afterEach, vi } from 'vitest';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { CheckInUseCase } from '@/use-cases/check-in';

let checkInsRepository: InMemoryCheckInsRepository;
let sut: CheckInUseCase;

describe('Check-in tests', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new CheckInUseCase(checkInsRepository);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('Deve ser possível cadastrar um check-in', async () => {
    vi.setSystemTime(new Date(2025, 4, 15, 20, 0, 0));

    const { checkIn } = await sut.handle({
      userId: 'user-01',
      gymId: 'gym-01',
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  test('Não deve ser possível realizar 2 check-ins no mesmo dia', async () => {
    vi.setSystemTime(new Date(2025, 4, 15, 20, 0, 0));

    const { checkIn } = await sut.handle({
      userId: 'user-01',
      gymId: 'gym-01',
    });

    await expect(
      sut.handle({
        userId: 'user-01',
        gymId: 'gym-01',
      })
    ).rejects.toBeInstanceOf(Error);
  });

  test('Deve ser possível realizar check-ins 2 vezes, mas em dias diferentes', async () => {
    vi.setSystemTime(new Date(2025, 4, 15, 20, 0, 0));

    await sut.handle({
      userId: 'user-01',
      gymId: 'gym-01',
    });

    vi.setSystemTime(new Date(2025, 4, 16, 20, 0, 0));

    const { checkIn } = await sut.handle(
      {
        userId: 'user-01',
        gymId: 'gym-01',
      }
    );

    expect(checkIn.id).toEqual(expect.any(String));
  });
});
