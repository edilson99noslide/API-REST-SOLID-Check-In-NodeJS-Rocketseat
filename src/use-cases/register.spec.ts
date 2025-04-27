import { expect, describe, test } from 'vitest';
import { RegisterUseCase } from '@/use-cases/register';
import { compare } from 'bcryptjs';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import {UserAlreadyExistsError} from "@/use-cases/errors/user-already-exists-error";

describe('Register tests', () => {
  test('Não deve ser possível cadastrar um usuário', async () => {
    const UsersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(UsersRepository);

    const { user } = await registerUseCase.handle({
      name: 'Usuário de teste',
      email: 'usuario-de-exemplo@gmail.com',
      password: '123456',
    });

    expect(user.id).toEqual(expect.any(String));
  });

  test('A senha do usuário deve estar criptografada assim que ele ser criado', async () => {
    const UsersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(UsersRepository);

    const { user } = await registerUseCase.handle({
      name: 'Usuário de teste',
      email: 'usuario-de-teste@gmail.com',
      password: '123456',
    });

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  test('Não deve ser possível cadastrar um usuário com um e-mail existente', async () => {
    const UsersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(UsersRepository);

    const email = 'usuario-de-exemplo@gmail.com';

    await registerUseCase.handle({
      name: 'Usuário de teste',
      email,
      password: '123456',
    });

    await expect(() =>
      registerUseCase.handle({
        name: 'Usuário de teste',
        email,
        password: '123456',
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
