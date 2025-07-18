import { prisma } from '../lib/prisma';
import { Transaction as PrismaTransaction } from '@prisma/client';

export interface TransactionRepository {
  findAll(): Promise<PrismaTransaction[]>;
  findById(id: string): Promise<PrismaTransaction | null>;
  create(transaction: Omit<PrismaTransaction, 'id'>): Promise<PrismaTransaction>;
  update(id: string, data: Partial<PrismaTransaction>): Promise<void>;
  delete(id: string): Promise<void>;
}

export class PrismaTransactionRepository implements TransactionRepository {
  async findAll(): Promise<PrismaTransaction[]> {
    return prisma.transaction.findMany({ include: { category: true, bank: true } });
  }
  async findById(id: string): Promise<PrismaTransaction | null> {
    return prisma.transaction.findUnique({ where: { id }, include: { category: true, bank: true } });
  }
  async create(transaction: Omit<PrismaTransaction, 'id'>): Promise<PrismaTransaction> {
    return prisma.transaction.create({ data: { ...transaction } });
  }
  async update(id: string, data: Partial<PrismaTransaction>): Promise<void> {
    await prisma.transaction.update({ where: { id }, data });
  }
  async delete(id: string): Promise<void> {
    await prisma.transaction.delete({ where: { id } });
  }
} 