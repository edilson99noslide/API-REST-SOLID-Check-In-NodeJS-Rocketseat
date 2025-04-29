import {beforeEach, describe, expect, test} from 'vitest';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { GetUserProfileUseCase } from '@/use-cases/get-user-profile';
import { hash } from 'bcryptjs';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';

let usersRepository: InMemoryUsersRepository;
let sut: GetUserProfileUseCase;

describe('Get user test', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut             = new GetUserProfileUseCase(usersRepository);
  });

  test('Deve ser possível listar um usuário', async () => {
    const createdUser = await usersRepository.create({
      name: 'usuario de exemplo',
      email: 'usuario-de-exemplo@gmail.com',
      password_hash: await hash('123456', 6),
    });

    const { user } = await sut.handle({ userId: createdUser.id });

    expect(user.id).toEqual(expect.any(String));
    expect(user.name).toEqual('usuario de exemplo');
  });

  test('Não deve ser possível listar um usuário se o id não for encontrado', async () => {
    await expect(() =>
      sut.handle({
        userId: 'id-not-found'
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});