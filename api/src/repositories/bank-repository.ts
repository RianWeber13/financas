import { Bank } from '../lib/object';
import { prisma } from '../lib/prisma';

export interface BankRepository {
  findAll(): Promise<Bank[]>;
  create(bank: Omit<Bank, 'id'>): Promise<Bank>;
  findByName(name: string): Promise<Bank | null>;
  update(id: string, data: Partial<Bank>): Promise<void>;
  delete(id: string): Promise<void>;
}

export class PrismaBankRepository implements BankRepository {
  async findAll(): Promise<Bank[]> {
    return prisma.bank.findMany();
  }
  async create(bank: Omit<Bank, 'id'>): Promise<Bank> {
    return prisma.bank.create({ data: { ...bank } });
  }
  async findByName(name: string): Promise<Bank | null> {
    return prisma.bank.findFirst({ where: { name } });
  }
  async update(id: string, data: Partial<Bank>): Promise<void> {
    await prisma.bank.update({ where: { id }, data });
  }
  async delete(id: string): Promise<void> {
    await prisma.bank.delete({ where: { id } });
  }
}