import { Bank } from '../lib/object'; 
import { BankRepository } from '../repositories/bank-repository';

export class BankService {
  constructor(private bankRepository: BankRepository) {}

  async getAll() {
    return this.bankRepository.findAll();
  }

  async create(data: { name: string }) {
    const exists = await this.bankRepository.findByName(data.name);
    if (exists) {
      throw new Error('Banco já existe');
    }
    const bank = await this.bankRepository.create({ name: data.name });
    return bank;
  }

  async update(id: string, data: Partial<Bank>) {
    await this.bankRepository.update(id, data);
  }

  async delete(id: string) {
    await this.bankRepository.delete(id);
  }
}