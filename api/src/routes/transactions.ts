
import { FastifyInstance } from 'fastify';
import { TransactionController } from '../controllers/transaction-controller';

export async function transactionRoutes(app: FastifyInstance) {
  app.get('/', TransactionController.getAll);
  app.get('/:id', TransactionController.getById);
  app.post('/', TransactionController.create);
  app.put('/:id', TransactionController.update);
  app.delete('/:id', TransactionController.delete);
}