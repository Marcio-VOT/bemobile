import { DateTime, MonthNumbers } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Sale extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public deleted: boolean
  @column()
  public client_id: number
  @column()
  public product_id: number
  @column()
  public quantity: number
  @column()
  public unit_price: number
  @column()
  public total_price: number
  @column()
  public month: MonthNumbers
  @column()
  public year: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
