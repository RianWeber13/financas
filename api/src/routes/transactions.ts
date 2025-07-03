import { FastifyInstance } from 'fastify';
import { prisma } from '../lib/prisma';
import { Transaction } from '../lib/object';

export async function transactionRoutes(app: FastifyInstance) {
  app.get('/transactions', async () => {
    const transactions = await prisma.transaction.findMany({
      include: {
        category: true,
        bank: true,
      },
    });
    return transactions;
  });

  app.get('/transactions/:id', async (request) => {
    const { id } = request.params as { id: string };
    const transaction = await prisma.transaction.findUniqueOrThrow({
      where: { id },
      include: {
        category: true,
        bank: true,
      },
    });
    return transaction;
  });

  app.post('/transactions', async (request, reply) => {
    const { description, amount, type, bankId, categoryId } = request.body as any;
    
    const transaction = new Transaction({
      description,
      amount,
      date: new Date(),
      type,
      bankId,
      categoryId,
    });

    await prisma.transaction.create({
      data: { ...transaction },
    });
    return reply.status(201).send();
  });

  app.put('/transactions/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const data = request.body as any;

    await prisma.transaction.update({
      where: { id },
      data,
    });
    return reply.status(204).send();
  });

  app.delete('/transactions/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    await prisma.transaction.delete({
      where: { id },
    });
    return reply.status(204).send();
  });
}