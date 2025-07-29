import { FastifyInstance } from 'fastify';
import { CategoryController } from '../controllers/category-controller';

export async function categoryRoutes(app: FastifyInstance) {
  app.get('/', CategoryController.getAll);
  app.post('/', CategoryController.create);
  app.put('/:id', CategoryController.update);
  app.delete('/:id', CategoryController.delete);
}