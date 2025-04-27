import { expect, describe, test } from 'vitest';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { AuthenticateUseCase } from '@/use-cases/authenticate';
import { hash } from 'bcryptjs';
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error';

describe('Authenticate tests', () => {
  test('Deve ser possível autenticar na aplicação', async () => {
    const UsersRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateUseCase(UsersRepository);

    UsersRepository.create({
      name: 'usuario de exemplo',
      email: 'usuario-de-exemplo@gmail.com',
      password_hash: await hash('123456', 6),
    });

    const { user } = await sut.handle({
      email: 'usuario-de-exemplo@gmail.com',
      password: '123456',
    });

    expect(user.id).toEqual(expect.any(String));
  });

  test('Não deve ser possível autenticar na aplicação caso não exista o usuário cadastrado', async () => {
    const UsersRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateUseCase(UsersRepository);

    await expect(
      () =>
        sut.handle({
          email: 'usuario-de-exemplo@gmail.com',
          password: '1234567',
        })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  test('Não deve ser possível autenticar na aplicação caso as credenciais sejam inválidas', async () => {
    const UsersRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateUseCase(UsersRepository);

    await UsersRepository.create({
      name: 'usuario de exemplo',
      email: 'usuario-de-exemplo@gmail.com',
      password_hash: await hash('123456', 6),
    });

    await expect(
      () =>
        sut.handle({
          email: 'usuario-de-exemplo@gmail.com',
          password: '1234567',
        })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
