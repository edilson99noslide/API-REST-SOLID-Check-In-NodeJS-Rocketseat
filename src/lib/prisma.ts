import { PrismaClient } from '@/lib/prisma';
import { env } from '@/env';

export * from '../../generated/prisma';

export const prisma = new PrismaClient({
  log: env.NODE_ENV === 'dev' ? ['query'] : []
});