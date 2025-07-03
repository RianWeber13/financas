import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { Bank } from '../lib/object';

export async function bankRoutes(app: FastifyInstance) {

  app.get('/banks', async () => {
    const banks = await prisma.bank.findMany();
    return banks;
  });

  // Criar um novo banco
  app.post('/banks', async (request, reply) => {
    const createBankBody = z.object({
      name: z.string(),
    });
    const { name } = createBankBody.parse(request.body);
    const bank = new Bank({ name });
    await prisma.bank.create({
      data: { ...bank },
    });
    return reply.status(201).send();
  });
}