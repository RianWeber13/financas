import { FastifyInstance } from 'fastify';
import { prisma } from '../lib/prisma';
import { Bank } from '../lib/object';

export async function bankRoutes(app: FastifyInstance) {

  app.get('/banks', async () => {
    const banks = await prisma.bank.findMany();
    return banks;
  });

  app.post('/banks', async (request, reply) => {
    const { name } = request.body as any;
    
    const bank = new Bank({ name });
    await prisma.bank.create({
      data: { ...bank },
    });
    return reply.status(201).send();
  });
}