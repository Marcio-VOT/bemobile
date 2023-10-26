import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title', 80).notNullable()
      table.string('author', 80).notNullable()
      table.text('description').notNullable()
      table.string('isbn').notNullable().unique()
      table.string('image').notNullable()
      table.float('price').notNullable()
      table.integer('stock').notNullable()
      table.string('category', 80).notNullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('published_at', { useTz: true }).notNullable()
      table.timestamp('deleted_at', { useTz: true }).nullable().defaultTo(null)
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
