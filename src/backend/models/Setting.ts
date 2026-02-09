import mongoose, { Schema, Document } from 'mongoose'

export interface ISetting extends Document {
  key: string
  value: any
  createdAt: Date
  updatedAt: Date
}

const SettingSchema: Schema = new Schema(
  {
    key: { type: String, required: true, unique: true },
    value: { type: Schema.Types.Mixed }, // Can be string, number, object, etc.
  },
  { timestamps: true },
)

const Setting = mongoose.models.Setting || mongoose.model<ISetting>('Setting', SettingSchema)
export default Setting
