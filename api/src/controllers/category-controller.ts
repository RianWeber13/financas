import { FastifyRequest, FastifyReply } from 'fastify';
import { CategoryService } from '../services/category-service';
import { PrismaCategoryRepository } from '../repositories/category-repository';

const service = new CategoryService(new PrismaCategoryRepository());

export const CategoryController = {
  async getAll(request: FastifyRequest, reply: FastifyReply) {
    const categories = await service.getAll();
    return reply.send(categories);
  },
  async create(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { name, icon } = request.body as any;
      const category = await service.create({ name, icon });
      return reply.status(201).send(category);
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