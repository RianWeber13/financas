import { TransactionRepository } from '../repositories/transaction-repository';
import { Transaction as PrismaTransaction } from '@prisma/client';

export class TransactionService {
  constructor(private transactionRepository: TransactionRepository) {}

  async getAll() {
    return this.transactionRepository.findAll();
  }

  async getById(id: string) {
    return this.transactionRepository.findById(id);
  }

  async create(data: {
    description: string;
    amount: number;
    type: 'income' | 'expense';
    bankId: string;
    categoryId: string;
    date?: Date;
  }) {
    const transaction = await this.transactionRepository.create({ 
      ...data, 
      date: data.date || new Date() 
    });
    return transaction;
  }

  async update(id: string, data: Partial<PrismaTransaction>) {
    await this.transactionRepository.update(id, data);
  }

  async delete(id: string) {
    await this.transactionRepository.delete(id);
  }
} 