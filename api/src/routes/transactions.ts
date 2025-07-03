// api/src/rotas/transactions.ts
import { FastifyInstance } from 'fastify';
import { prisma } from '../lib/prisma';
import { Transaction } from '../lib/object';

export async function transactionRoutes(app: FastifyInstance) {
  // A rota base agora é '/', pois o prefixo já é '/api/transactions'
  app.get('/', async () => {
    const transactions = await prisma.transaction.findMany({
      include: {
        category: true,
        bank: true,
      },
    });
    return transactions;
  });

  // A rota com ID fica '/:id'
  app.get('/:id', async (request) => {
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

  // A rota de POST também é na raiz '/'
  app.post('/', async (request, reply) => {
    const { description, amount, type, bankId, categoryId } = request.body as any;
    
    const transaction = new Transaction({
      description, amount, type, bankId, categoryId,
      date: new Date(),
    });

    await prisma.transaction.create({ data: { ...transaction } });
    return reply.status(201).send();
  });
  
  // E assim por diante para PUT e DELETE...
  app.put('/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const data = request.body as any;
    await prisma.transaction.update({ where: { id }, data });
    return reply.status(204).send();
  });

  app.delete('/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    await prisma.transaction.delete({ where: { id } });
    return reply.status(204).send();
  });
}