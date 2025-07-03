import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { prisma } from '../lib'; 
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

  // Obter uma transação por ID
  app.get('/transactions/:id', async (request) => {
    const getTransactionParams = z.object({
      id: z.string().uuid(),
    });
    const { id } = getTransactionParams.parse(request.params);
    const transaction = await prisma.transaction.findUniqueOrThrow({
      where: { id },
      include: {
        category: true,
        bank: true,
      },
    });
    return transaction;
  });

  // Criar uma nova transação
  app.post('/transactions', async (request, reply) => {
    const createTransactionBody = z.object({
      description: z.string(),
      amount: z.number(),
      type: z.enum(['income', 'expense']),
      bankId: z.string().uuid(),
      categoryId: z.string().uuid(),
    });
    const { description, amount, type, bankId, categoryId } = createTransactionBody.parse(request.body);
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
  
  // Atualizar uma transação
  app.put('/transactions/:id', async (request, reply) => {
    const updateTransactionParams = z.object({
      id: z.string().uuid(),
    });
    const updateTransactionBody = z.object({
      description: z.string().optional(),
      amount: z.number().optional(),
      type: z.enum(['income', 'expense']).optional(),
      bankId: z.string().uuid().optional(),
      categoryId: z.string().uuid().optional(),
    });
    const { id } = updateTransactionParams.parse(request.params);
    const data = updateTransactionBody.parse(request.body);
    await prisma.transaction.update({
      where: { id },
      data,
    });
    return reply.status(204).send();
  });

  // Excluir uma transação
  app.delete('/transactions/:id', async (request, reply) => {
    const deleteTransactionParams = z.object({
      id: z.string().uuid(),
    });
    const { id } = deleteTransactionParams.parse(request.params);
    await prisma.transaction.delete({
      where: { id },
    });
    return reply.status(204).send();
  });
}