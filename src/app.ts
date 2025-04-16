import fastify from 'fastify'
import { PrismaClient } from '@/lib/prisma'

export const app = fastify()

const prisma = new PrismaClient()

prisma.user.create({
  data: {
    name: 'User Admin',
    email: 'user-admin@email.com',
  }
})