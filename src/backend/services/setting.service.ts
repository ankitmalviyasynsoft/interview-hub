import Setting, { ISetting } from '../models/Setting'
import { BaseService } from './base.service'
import dbConnect from '../lib/db'

export class SettingService extends BaseService<ISetting> {
  constructor() {
    super(Setting)
  }

  async getValue(key: string): Promise<any> {
    await dbConnect()
    const setting = await Setting.findOne({ key })
    return setting ? setting.value : null
  }

  async setValue(key: string, value: any): Promise<ISetting> {
    await dbConnect()
    return Setting.findOneAndUpdate({ key }, { value }, { upsert: true, new: true })
  }
}

export const settingService = new SettingService()
