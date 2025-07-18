import { Category } from '../lib/object';

export interface CategoryRepository {
  findAll(): Promise<Category[]>;
  create(category: Omit<Category, 'id'>): Promise<Category>;
  findByName(name: string): Promise<Category | null>;
}

import { prisma } from '../lib/prisma';

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
} 