import Category, { ICategory } from '../models/Category'
import { BaseService } from './base.service'

export class CategoryService extends BaseService<ICategory> {
  constructor() {
    super(Category)
  }
}

export const categoryService = new CategoryService()
