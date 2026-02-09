import Company, { ICompany } from '../models/Company'
import { BaseService } from './base.service'

export class CompanyService extends BaseService<ICompany> {
  constructor() {
    super(Company)
  }
}

export const companyService = new CompanyService()
