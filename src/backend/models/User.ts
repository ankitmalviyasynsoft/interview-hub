import mongoose, { Schema, Document } from 'mongoose'
import bcrypt from 'bcryptjs'

export interface IUser extends Document {
  name: string
  email: string
  password?: string
  role: any // Populated or ObjectId
  occupation?: string
  image?: string
  resetPasswordToken?: string
  resetPasswordExpire?: Date
  createdAt: Date
  updatedAt: Date
  comparePassword(candidatePassword: string): Promise<boolean>
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, select: false }, // Password is optional for potential OAuth users later
    role: { type: Schema.Types.ObjectId, ref: 'Role', required: true },
    occupation: { type: String },
    image: { type: String },
    resetPasswordToken: { type: String, select: false },
    resetPasswordExpire: { type: Date, select: false },
  },
  { timestamps: true },
)

// Pre-save hook to hash password
UserSchema.pre<IUser>('save', async function () {
  if (!this.isModified('password') || !this.password) return

  try {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
  } catch (err) {
    throw err
  }
})

// Method to compare password
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  if (!this.password) return false
  return bcrypt.compare(candidatePassword, this.password)
}

// Check if model exists before compiling to avoid OverwriteModelError in dev
const User = mongoose.models.User || mongoose.model<IUser>('users', UserSchema)

export default User
