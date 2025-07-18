import { FastifyRequest, FastifyReply } from 'fastify';
import { TransactionService } from '../services/transaction-service';
import { PrismaTransactionRepository } from '../repositories/transaction-repository';

const service = new TransactionService(new PrismaTransactionRepository());

export const TransactionController = {
  async getAll(request: FastifyRequest, reply: FastifyReply) {
    const transactions = await service.getAll();
    return reply.send(transactions);
  },
  async getById(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    const transaction = await service.getById(id);
    if (!transaction) return reply.status(404).send({ error: 'Transação não encontrada' });
    return reply.send(transaction);
  },
  async create(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { description, amount, type, bankId, categoryId } = request.body as any;
      const transaction = await service.create({ description, amount, type, bankId, categoryId });
      return reply.status(201).send(transaction);
    } catch (err: any) {
      return reply.status(400).send({ error: err.message });
    }
  },
  async update(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    const data = request.body as any;
    await service.update(id, data);
    return reply.status(204).send();
  },
  async delete(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    await service.delete(id);
    return reply.status(204).send();
  },
}; 