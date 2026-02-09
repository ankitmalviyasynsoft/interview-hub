import { BaseController } from './base.controller'
import { categoryService } from '../services/category.service'
import Category from '../models/Category'

export const categoryController = new BaseController(categoryService, Category)
