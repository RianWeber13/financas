import { FastifyInstance } from 'fastify';
import { PrismaClient } from '@prisma/client';

// Cria uma única instância do PrismaClient para ser usada em toda a API
const prisma = new PrismaClient();

export async function transactionRoutes(app: FastifyInstance) {

  /**
   * Rota de Boas-Vindas
   * Retorna uma mensagem simples para confirmar que a API está no ar.
   */
  app.get('/', async () => {
    return { message: 'API de Finanças está no ar e conectada ao banco de dados!' };
  });

  // --- ROTAS DE TRANSAÇÕES ---

  /**
   * GET /api/transactions
   * Busca e retorna todas as transações do banco de dados.
   * Inclui os dados completos do banco e da categoria relacionados.
   */
  app.get('/api/transactions', async (request, reply) => {
    try {
      const transactions = await prisma.transaction.findMany({
        include: {
          category: true, // Inclui o objeto Category completo
          bank: true,     // Inclui o objeto Bank completo
        },
        orderBy: {
          date: 'desc' // Ordena pela data mais recente
        }
      });
      return transactions;
    } catch (error) {
      console.error("Erro ao buscar transações:", error);
      reply.status(500).send({ message: "Erro interno ao buscar transações." });
    }
  });

  /**
   * POST /api/transactions
   * Cria uma nova transação.
   */
  app.post('/api/transactions', async (request, reply) => {
    // No futuro, esta seção pode ser melhorada com validação (Zod)
    const { description, amount, type, bankId, categoryId } = request.body as any;

    // Validação básica para garantir que todos os campos necessários foram enviados
    if (!description || !amount || !type || !bankId || !categoryId) {
      return reply.status(400).send({ message: 'Todos os campos são obrigatórios: description, amount, type, bankId, categoryId.' });
    }

    try {
      const newTransaction = await prisma.transaction.create({
        data: {
          description,
          amount: parseFloat(amount), // Converte o valor para número
          type,
          date: new Date(),
          bankId,
          categoryId,
        }
      });
      // Retorna 201 (Criado) e a transação recém-criada
      return reply.status(201).send(newTransaction);
    } catch (error) {
      console.error("Erro ao criar transação:", error);
      // Retorna um erro caso o bankId ou categoryId não existam, por exemplo.
      reply.status(500).send({ message: "Não foi possível criar a transação. Verifique se o banco e a categoria existem." });
    }
  });

  // --- ROTAS DE CATEGORIAS ---

  /**
   * GET /api/categories
   * Busca e retorna todas as categorias.
   */
  app.get('/api/categories', async (request, reply) => {
    try {
      const categories = await prisma.category.findMany();
      return categories;
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
      reply.status(500).send({ message: "Erro interno ao buscar categorias." });
    }
  });

  /**
   * POST /api/categories
   * Cria uma nova categoria.
   */
  app.post('/api/categories', async (request, reply) => {
    const { name, icon } = request.body as any;

    if (!name || !icon) {
      return reply.status(400).send({ message: "Os campos 'name' e 'icon' são obrigatórios." });
    }

    try {
      const category = await prisma.category.create({ data: { name, icon } });
      return reply.status(201).send(category);
    } catch (error) {
      console.error("Erro ao criar categoria:", error);
      reply.status(500).send({ message: "Não foi possível criar a categoria." });
    }
  });

  // --- ROTAS DE BANCOS ---

  /**
   * GET /api/banks
   * Busca e retorna todos os bancos.
   */
  app.get('/api/banks', async (request, reply) => {
    try {
      const banks = await prisma.bank.findMany();
      return banks;
    } catch (error) {
      console.error("Erro ao buscar bancos:", error);
      reply.status(500).send({ message: "Erro interno ao buscar bancos." });
    }
  });

  /**
   * POST /api/banks
   * Cria um novo banco.
   */
  app.post('/api/banks', async (request, reply) => {
    const { name } = request.body as any;

    if (!name) {
      return reply.status(400).send({ message: "O campo 'name' é obrigatório." });
    }

    try {
      const bank = await prisma.bank.create({ data: { name } });
      return reply.status(201).send(bank);
    } catch (error) {
      console.error("Erro ao criar banco:", error);
      reply.status(500).send({ message: "Não foi possível criar o banco." });
    }
  });
}