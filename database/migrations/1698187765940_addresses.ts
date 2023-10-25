import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'addresses'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('client_id')
        .unsigned().references('id').inTable('clients').onDelete('CASCADE').unique().notNullable()
      table.string('zip_code', 8).notNullable()
      table.string('country', 50).notNullable()
      table.string('state', 50).notNullable()
      table.string('city', 50).notNullable()
      table.string('street', 50).notNullable()
      table.string('neighborhood', 50).notNullable()
      table.integer('number').notNullable()
      table.string('complement', 100)

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
