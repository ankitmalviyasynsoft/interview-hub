import { BaseController } from './base.controller'
import { blogService } from '../services/blog.service'
import Blog from '../models/Blog'

export const blogController = new BaseController(blogService, Blog)
