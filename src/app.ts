import fastify from 'fastify';
import { appRoutes } from '@/http/routes';
import { ZodError } from 'zod';
import { env } from '@/env';

export const app = fastify();

app.register(appRoutes);

app.setErrorHandler((error, _request, reply) => {
  if(error instanceof ZodError) reply
    .status(404)
    .send({
        success: false,
        message: 'Ocorreu um erro na validação dos dados!',
        issues: error.format()
      });

  if(env.NODE_ENV !== 'prod') {
    console.error(error);
  } else {
    // TODO: Futuramente criar um log do erro em uma ferramenta externa de observabilidade, exemplo: DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({
    success: false,
    message: 'Ocorreu um erro interno!'
  });
});