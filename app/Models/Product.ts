import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Sale from './Sale'

export default class Product extends BaseModel {
  @hasMany(()=> Sale, {localKey: 'id', foreignKey: 'product_id'})
  public sales: HasMany<typeof Sale>

  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string
  @column()
  public author: string
  @column()
  public description: string
  @column()
  public isbn: string
  @column()
  public image: string
  @column()
  public price: number
  @column()
  public stock: number
  @column()
  public category: string

  @column.dateTime()
  public published_at: DateTime

  @column.dateTime()
  public deleted_at: DateTime | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
