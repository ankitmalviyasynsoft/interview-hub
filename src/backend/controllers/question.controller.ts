import { BaseController } from './base.controller'
import { questionService } from '../services/question.service'
import Question from '../models/Question'

export const questionController = new BaseController(questionService, Question)
