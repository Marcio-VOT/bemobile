import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateClientValidator {
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
   *     schema.string([z'
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    client: schema.object().members({
      name: schema.string({}, [
        rules.maxLength(255),
        rules.minLength(3),
      ]),
      cpf: schema.string({}, [
        rules.maxLength(11),
        rules.minLength(11),
        rules.regex(/^\d+$/),
        rules.unique({ table: 'clients', column: 'cpf' }),
      ]),
    })
    ,
    phone: schema.string({}, [
      rules.mobile(),
      rules.unique({ table: 'phones', column: 'phone' }),
    ]),
    address: schema.object().members({
      zip_code: schema.string({}, [
        rules.maxLength(8),
        rules.minLength(8),
        rules.regex(/^\d+$/),
      ]),
      country: schema.string({},[
        rules.maxLength(50),
        rules.minLength(3),
      ]),
      state: schema.string({},[
        rules.maxLength(50),
        rules.minLength(3),
      ]),
      city: schema.string({},[
        rules.maxLength(50),
        rules.minLength(3),
      ]),
      street: schema.string({},[
        rules.maxLength(50),
        rules.minLength(3),
      ]),
      neighborhood: schema.string({},[
        rules.maxLength(50),
        rules.minLength(3),
      ]),
      number: schema.number([
        rules.unsigned(),
      ]),
      complement: schema.string.optional({},[
        rules.maxLength(100),
        rules.minLength(3),
      ]),
    }),
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
  public messages: CustomMessages = {}
}
