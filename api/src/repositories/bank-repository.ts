import { Bank } from '../lib/object';

export interface BankRepository {
  findAll(): Promise<Bank[]>;
  create(bank: Omit<Bank, 'id'>): Promise<Bank>;
  findByName(name: string): Promise<Bank | null>;
}

import { prisma } from '../lib/prisma';

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
} 