import { FastifyRequest, FastifyReply } from 'fastify';
import { BankService } from '../services/bank-service';
import { PrismaBankRepository } from '../repositories/bank-repository';

const service = new BankService(new PrismaBankRepository());

export const BankController = {
  async getAll(request: FastifyRequest, reply: FastifyReply) {
    const banks = await service.getAll();
    return reply.send(banks);
  },
  async create(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { name } = request.body as any;
      const bank = await service.create({ name });
      return reply.status(201).send(bank);
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