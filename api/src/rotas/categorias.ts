import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { Category } from '../lib/object';

export async function categoryRoutes(app: FastifyInstance) {

  app.get('/categories', async () => {
    const categories = await prisma.category.findMany();
    return categories;
  });

  // Criar uma nova categoria
  app.post('/categories', async (request, reply) => {
    const createCategoryBody = z.object({
      name: z.string(),
      icon: z.string(),
    });
    const { name, icon } = createCategoryBody.parse(request.body);
    const category = new Category({ name, icon });
    await prisma.category.create({
      data: { ...category },
    });
    return reply.status(201).send();
  });
}