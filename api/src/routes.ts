import { FastifyInstance } from 'fastify';
import { transactionRoutes } from './routes/transactions';
import { categoryRoutes } from './routes/categories';
import { bankRoutes } from './routes/banks';


export async function appRoutes(app: FastifyInstance) {
  // Rotas
  app.register(transactionRoutes, { prefix: '/api/transactions' });
  app.register(categoryRoutes, { prefix: '/api/categories' });
  app.register(bankRoutes, { prefix: '/api/banks' });
  

}