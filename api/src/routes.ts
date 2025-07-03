import { FastifyInstance } from 'fastify';
import { transactionRoutes } from './routes/transactions';
import { categoryRoutes } from './routes/categories';
import { bankRoutes } from './routes/banks';

export async function appRoutes(app: FastifyInstance) {
  app.register(transactionRoutes, { prefix: '/api' });
  app.register(categoryRoutes, { prefix: '/api' });
  app.register(bankRoutes, { prefix: '/api' });
}