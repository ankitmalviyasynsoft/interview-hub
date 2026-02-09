import User, { IUser } from '../models/User'
import dbConnect from '../lib/db'

export class UserService {
  static async createUser(data: Partial<IUser>): Promise<IUser> {
    await dbConnect()
    const user = await User.create(data)
    return user
  }

  static async findUserByEmail(email: string, selectPassword = false): Promise<IUser | null> {
    await dbConnect()
    let query = User.findOne({ email }).populate('role')
    if (selectPassword) {
      query = query.select('+password')
    }
    return query.exec()
  }

  static async findUserById(id: string): Promise<IUser | null> {
    await dbConnect()
    return User.findById(id).populate('role').exec()
  }

  static async findUserByToken(token: string): Promise<IUser | null> {
    await dbConnect()
    return User.findOne({
      resetPasswordToken: token,
      resetPasswordExpire: { $gt: Date.now() },
    })
      .populate('role')
      .exec()
  }
}
