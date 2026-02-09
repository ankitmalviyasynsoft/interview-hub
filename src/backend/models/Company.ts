import mongoose, { Schema, Document } from 'mongoose'

export interface ICompany extends Document {
  name: string
  description?: string
  website?: string
  logo?: string
  createdAt: Date
  updatedAt: Date
}

const CompanySchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    website: { type: String },
    logo: { type: String },
  },
  { timestamps: true },
)

const Company = mongoose.models.Company || mongoose.model<ICompany>('Company', CompanySchema)
export default Company
