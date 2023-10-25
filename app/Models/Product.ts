import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Product extends BaseModel {
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
  @column()
  public publication_date: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
