import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'

export async function seedRoutes(app: FastifyInstance) {
  app.get('/seed', async (request, reply) => {
    try {
      console.log('Iniciando o processo de seed via rota...');

      // Apaga os dados existentes 
      await prisma.transaction.deleteMany()
      await prisma.category.deleteMany()
      await prisma.bank.deleteMany()
      console.log('Dados antigos apagados com sucesso.');

      //  Cria os Bancos
      console.log('Criando bancos...');
      const nubank = await prisma.bank.create({ data: { name: 'Nubank' } })
      const bdob = await prisma.bank.create({ data: { name: 'Banco do Brasil' } })
      const flash = await prisma.bank.create({ data: { name: 'Flash' } })
      console.log('Bancos criados.');

      //  Cria as Categorias
      console.log('Criando categorias...');
      const alimentacao = await prisma.category.create({ data: { name: 'Alimentação', icon: 'ShoppingBasket' } })
      const transporte = await prisma.category.create({ data: { name: 'Transporte', icon: 'Car' } })
      const lazer = await prisma.category.create({ data: { name: 'Lazer', icon: 'Film' } })
      const rendimentos = await prisma.category.create({ data: { name: 'Rendimentos', icon: 'DollarSign' } })
      console.log('Categorias criadas.');

      // Cria as Transações
      console.log('Criando transações...');
      await prisma.transaction.createMany({
        data: [
          {
            description: 'Supermercado',
            type: 'expense',
            amount: 773.0,
            date: new Date('2025-01-05T10:00:00Z'),
            bankId: flash.id,
            categoryId: alimentacao.id,
          },
          {
            description: 'Salário',
            type: 'income',
            amount: 3200.0,
            date: new Date('2024-12-30T09:00:00Z'),
            bankId: bdob.id,
            categoryId: rendimentos.id,
          },
          {
            description: 'Uber',
            type: 'expense',
            amount: 25.0,
            date: new Date('2025-01-21T22:00:00Z'),
            bankId: nubank.id,
            categoryId: transporte.id,
          },
          {
            description: 'Cinema',
            type: 'expense',
            amount: 60.0,
            date: new Date('2025-01-10T20:00:00Z'),
            bankId: nubank.id,
            categoryId: lazer.id,
          },
        ]
      })
      console.log('Transações criadas.');
      
      return reply.status(200).send({ message: 'Banco de dados populado com sucesso!' })

    } catch (error) {
      console.error('Erro ao popular o banco de dados:', error)
      return reply.status(500).send({ message: 'Erro ao popular o banco de dados.', error })
    }
  })
}