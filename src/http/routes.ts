import { FastifyInstance } from 'fastify';
import { register } from '@/http/controllers/register.controller';
import { authenticate } from '@/http/controllers/authenticate.controller';

export async function appRoutes(app: FastifyInstance) {
  app.post('/api/users', register);

  app.post('/api/sessions', authenticate);
}