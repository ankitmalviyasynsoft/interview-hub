import Question, { IQuestion } from '../models/Question'
import { BaseService } from './base.service'

export class QuestionService extends BaseService<IQuestion> {
  constructor() {
    super(Question)
  }
}

export const questionService = new QuestionService()
