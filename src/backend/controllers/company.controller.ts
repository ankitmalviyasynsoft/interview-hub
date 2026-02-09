import { BaseController } from './base.controller'
import { companyService } from '../services/company.service'
import Company from '../models/Company'

export const companyController = new BaseController(companyService, Company)
