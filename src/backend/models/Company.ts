import mongoose, { Schema, Document } from 'mongoose'

export interface ICompany extends Document {
  name: string
  description: string
  isMNC: boolean
  website?: string
  logo?: string
  createdAt: Date
  updatedAt: Date
}

const CompanySchema: Schema = new Schema(
  {
    // Company Name
    name: { type: String, required: [true, 'Please provide a company name'], trim: true },

    // Company Description
    description: { type: String, required: [true, 'Please provide a company description'] },

    // Is Multi-National Company
    isMNC: { type: Boolean, default: false },

    // Website URL (Optional)
    website: { type: String },

    // Logo URL (Optional)
    logo: { type: String },
  },
  { timestamps: true },
)

const Company = mongoose.models.Company || mongoose.model<ICompany>('Company', CompanySchema)
export default Company
