import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error';
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case';

export async function authenticate(request: FastifyRequest, reply: FastifyReply): Promise<void> {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateBodySchema.parse(request.body);

  try {
    const authenticateUseCase = makeAuthenticateUseCase();

    await authenticateUseCase.handle({
      email,
      password,
    });
  } catch (error) {
    if(error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ success : false, message: error.message });
    }

    throw error;
  }

  return reply.status(200).send();
}