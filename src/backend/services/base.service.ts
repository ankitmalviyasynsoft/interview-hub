import mongoose, { Model, Document } from 'mongoose'
import dbConnect from '../lib/db'

export class BaseService<T extends Document> {
  constructor(private model: Model<T>) {}

  async create(data: Partial<T>): Promise<T> {
    await dbConnect()
    return this.model.create(data)
  }

  async findAll(filter: any = {}): Promise<T[]> {
    await dbConnect()
    return this.model.find(filter).exec()
  }

  async findById(id: string): Promise<T | null> {
    await dbConnect()
    return this.model.findById(id).exec()
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    await dbConnect()
    return this.model.findByIdAndUpdate(id, data, { new: true, runValidators: true }).exec()
  }

  async delete(id: string): Promise<T | null> {
    await dbConnect()
    return this.model.findByIdAndDelete(id).exec()
  }
}
