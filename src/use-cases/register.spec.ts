import { expect, describe, test } from 'vitest';
import { RegisterUseCase } from '@/use-cases/register';
import { compare } from 'bcryptjs';

describe('register tests', () => {
  test('A senha do usuário deve estar criptografada assim que ele ser criado', async () => {
    const registerUseCase = new RegisterUseCase({
      async findByEmail(email) {
        return null;
      },

      async create(data) {
        return {
          name: data.name,
          id: 'user-1',
          email: data.email,
          password_hash: data.password_hash,
          created_at: new Date(),
        }
      },
    });

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
});
