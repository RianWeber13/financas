import { FastifyInstance } from 'fastify';

import transactions from '../../src/assets/transactions.json';

export async function transactionRoutes(app: FastifyInstance) {

  app.get('/api/transactions', async (request, reply) => {
    
    return transactions;
  });
}