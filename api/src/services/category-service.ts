import { Category } from '../lib/object'; 
import { CategoryRepository } from '../repositories/category-repository';

export class CategoryService {
  constructor(private categoryRepository: CategoryRepository) {}

  async getAll() {
    return this.categoryRepository.findAll();
  }

  async create(data: { name: string; icon: string }) {
    const exists = await this.categoryRepository.findByName(data.name);
    if (exists) {
      throw new Error('Categoria já existe');
    }
    const category = await this.categoryRepository.create({ name: data.name, icon: data.icon });
    return category;
  }
  
  async update(id: string, data: Partial<Category>) {
    await this.categoryRepository.update(id, data);
  }

  async delete(id: string) {
    await this.categoryRepository.delete(id);
  }
}