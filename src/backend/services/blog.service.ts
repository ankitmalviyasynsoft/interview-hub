import Blog, { IBlog } from '../models/Blog'
import { BaseService } from './base.service'

export class BlogService extends BaseService<IBlog> {
  constructor() {
    super(Blog)
  }
}

export const blogService = new BlogService()
