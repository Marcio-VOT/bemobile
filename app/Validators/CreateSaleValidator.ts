import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateSaleValidator {
  constructor (protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string([ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string([
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  //create a schema for the sale, witch will be used to validate the request body
  // is must have client_id, product_id, quantity, unit_price, total_price
  public schema = schema.create({
    client_id: schema.number([
      rules.exists({ table: 'clients', column: 'id' }),
    ]),
    product_id: schema.number([
      rules.exists({ table: 'products', column: 'id', where: { deleted_at: null } }),
    ]),
    quantity: schema.number([
      rules.range(1, 100000),
    ]),
  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages: CustomMessages = {
    'client_id.required': 'Client ID is required',
    'client_id.exists': 'Client ID must be a valid ID',
    'product_id.required': 'Product ID is required',
    'product_id.exists': 'Product ID must be a valid ID',
    'quantity.required': 'Quantity is required',
    'quantity.range': 'Quantity must be between 1 and 100000',
  }
}
