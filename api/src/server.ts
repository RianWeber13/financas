import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';

// Constrói o caminho para o diretório raiz do projeto
const __dirname = path.dirname(fileURLToPath(import.meta.url));
// O arquivo .env está dois níveis acima da pasta /api/src
const projectRoot = path.resolve(__dirname, '..', '..'); 
dotenv.config({ path: path.join(projectRoot, '.env') });

import fastify from 'fastify';
import cors from '@fastify/cors';
import { transactionRoutes } from './routes'; 

const app = fastify({
  logger: true,
});



app.register(cors, {
  origin: '*', 
});


app.register(transactionRoutes);

const start = async () => {
  try {
    await app.listen({ port: 3333 });
    app.log.info('Servidor API rodando em http://localhost:3333');
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();