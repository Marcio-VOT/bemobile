import { DateTime } from 'luxon'
import { BaseModel, HasMany, HasOne, column, hasMany, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Address from './Address'
import Phone from './Phone'
import Sale from './Sale'

export default class Client extends BaseModel {
  @hasOne(() => Address, {localKey: 'id', foreignKey: 'client_id'})
  public address: HasOne<typeof Address>

  @hasOne(() => Phone, {localKey: 'id', foreignKey: 'client_id'})
  public phone: HasOne<typeof Phone>

  @hasMany(()=> Sale, {localKey: 'id', foreignKey: 'client_id'})
  public sales: HasMany<typeof Sale>

  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public cpf: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
