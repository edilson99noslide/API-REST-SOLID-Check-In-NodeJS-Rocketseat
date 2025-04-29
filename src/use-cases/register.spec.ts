import { expect, describe, test, beforeEach } from 'vitest';
import { RegisterUseCase } from '@/use-cases/register';
import { compare } from 'bcryptjs';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error';

let usersRepository: InMemoryUsersRepository;
let sut: RegisterUseCase;

describe('Register tests', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new RegisterUseCase(usersRepository);
  });

  test('Não deve ser possível cadastrar um usuário', async () => {
    const { user } = await sut.handle({
      name: 'Usuário de teste',
      email: 'usuario-de-exemplo@gmail.com',
      password: '123456',
    });

    expect(user.id).toEqual(expect.any(String));
  });

  test('A senha do usuário deve estar criptografada assim que ele ser criado', async () => {
    const { user } = await sut.handle({
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
    const email = 'usuario-de-exemplo@gmail.com';

    await sut.handle({
      name: 'Usuário de teste',
      email,
      password: '123456',
    });

    await expect(() =>
      sut.handle({
        name: 'Usuário de teste',
        email,
        password: '123456',
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
