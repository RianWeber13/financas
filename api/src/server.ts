import fastify from 'fastify';
import cors from '@fastify/cors';
import { appRoutes } from './routes'; 

const app = fastify({
  logger: true,
});

app.register(cors, {
  origin: '*', 
});

// rotas principais
app.register(appRoutes);

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