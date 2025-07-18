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
}; 