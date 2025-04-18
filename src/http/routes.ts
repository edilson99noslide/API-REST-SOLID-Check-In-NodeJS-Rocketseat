import { FastifyInstance } from 'fastify';
import { register } from '@/http/controllers/register.controller';

export async function appRoutes(app: FastifyInstance) {
  app.post('/api/users', register);
}