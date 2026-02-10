import mongoose, { Schema, Document } from 'mongoose'

export interface IRole extends Document {
  name: string
  description: string
  permissions: string[]
}

export const defaultRoles = ['USER', 'STAFF', 'ADMIN']

const RoleSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    permissions: { type: [String], default: [] },
  },
  { timestamps: true },
)

const Role = mongoose.models.Role || mongoose.model<IRole>('Role', RoleSchema)

export default Role
