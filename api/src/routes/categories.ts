import { FastifyInstance } from 'fastify';
import { prisma } from '../lib/prisma';
import { Category } from '../lib/object';

export async function categoryRoutes(app: FastifyInstance) {
  app.get('/', async () => { 
    const categories = await prisma.category.findMany();
    return categories;
  });

    app.post('/', async (request, reply) => {
    const { name, icon } = request.body as any;
    
    const category = new Category({ name, icon });
    await prisma.category.create({
      data: { ...category },
    });
    return reply.status(201).send();
  });
}