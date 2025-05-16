import { expect, describe, test, beforeEach, afterEach, vi } from 'vitest';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { CheckInUseCase } from '@/use-cases/check-in';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { Decimal } from '@prisma/client/runtime/library';

let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckInUseCase;

describe('Check-in tests', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository;
    gymsRepository = new InMemoryGymsRepository;
    sut = new CheckInUseCase(checkInsRepository, gymsRepository);

    gymsRepository.items.push(
      {
        id: 'gym-01',
        title: 'Academia 01',
        description: 'Essa é a melhor academia que existe!',
        phone: '(35) 91234-5678',
        latitude: new Decimal(0),
        longitude: new Decimal(0)
      }
    );

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('Deve ser possível cadastrar um check-in', async () => {
    const { checkIn } = await sut.handle({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: 0,
      userLongitude: 0,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  test('Não deve ser possível realizar 2 check-ins no mesmo dia', async () => {
    vi.setSystemTime(new Date(2025, 4, 15, 20, 0, 0));

    const { checkIn } = await sut.handle({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: 0,
      userLongitude: 0,
    });

    await expect(
      sut.handle({
        userId: 'user-01',
        gymId: 'gym-01',
        userLatitude: 0,
        userLongitude: 0,
      })
    ).rejects.toBeInstanceOf(Error);
  });

  test('Deve ser possível realizar check-ins 2 vezes, mas em dias diferentes', async () => {
    vi.setSystemTime(new Date(2025, 4, 15, 20, 0, 0));

    await sut.handle({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: 0,
      userLongitude: 0,
    });

    vi.setSystemTime(new Date(2025, 4, 16, 20, 0, 0));

    const { checkIn } = await sut.handle(
      {
        userId: 'user-01',
        gymId: 'gym-01',
        userLatitude: 0,
        userLongitude: 0,
      }
    );

    expect(checkIn.id).toEqual(expect.any(String));
  });
});
