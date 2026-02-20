export interface Company {
  _id: string
  name: string
}

export interface Category {
  _id: string
  name: string
}

export interface BaseQuestion {
  _id: string
  title: string
  modelAnswer: string
  targetCompanies: Company[]
  categories: Category[]
  complexity: string
  experience: string
  createdAt: string
}
