import { Category } from '../lib/object';
import { prisma } from '../lib/prisma';

export interface CategoryRepository {
  findAll(): Promise<Category[]>;
  create(category: Omit<Category, 'id'>): Promise<Category>;
  findByName(name: string): Promise<Category | null>;
  update(id: string, data: Partial<Category>): Promise<void>;
  delete(id: string): Promise<void>;
}

export class PrismaCategoryRepository implements CategoryRepository {
  async findAll(): Promise<Category[]> {
    return prisma.category.findMany();
  }
  async create(category: Omit<Category, 'id'>): Promise<Category> {
    return prisma.category.create({ data: { ...category } });
  }
  async findByName(name: string): Promise<Category | null> {
    return prisma.category.findFirst({ where: { name } });
  }
  async update(id: string, data: Partial<Category>): Promise<void> {
    await prisma.category.update({ where: { id }, data });
  }
  async delete(id: string): Promise<void> {
    await prisma.category.delete({ where: { id } });
  }
}