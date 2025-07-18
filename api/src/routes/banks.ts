import { FastifyInstance } from 'fastify';
import { BankController } from '../controllers/bank-controller';

export async function bankRoutes(app: FastifyInstance) {
  app.get('/', BankController.getAll);
  app.post('/', BankController.create);
}