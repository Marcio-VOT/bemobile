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
  public messages: CustomMessages = {
    'client.name.maxLength': 'The client name must be at most 255 characters long',
    'client.name.minLength': 'The client name must be at least 3 characters long',
    'client.cpf.maxLength': 'The CPF must be exactly 11 digits long',
    'client.cpf.minLength': 'The CPF must be exactly 11 digits long',
    'client.cpf.regex': 'The CPF must contain only digits',
    'client.cpf.unique': 'The CPF is already taken',
    'phone.mobile': 'The phone number must be a valid mobile number',
    'phone.unique': 'The phone number is already taken',
    'address.zip_code.maxLength': 'The zip code must be exactly 8 digits long',
    'address.zip_code.minLength': 'The zip code must be exactly 8 digits long',
    'address.zip_code.regex': 'The zip code must contain only digits',
    'address.country.maxLength': 'The country name must be at most 50 characters long',
    'address.country.minLength': 'The country name must be at least 3 characters long',
    'address.state.maxLength': 'The state name must be at most 50 characters long',
    'address.state.minLength': 'The state name must be at least 3 characters long',
    'address.city.maxLength': 'The city name must be at most 50 characters long',
    'address.city.minLength': 'The city name must be at least 3 characters long',
    'address.street.maxLength': 'The street name must be at most 50 characters long',
    'address.street.minLength': 'The street name must be at least 3 characters long',
    'address.neighborhood.maxLength': 'The neighborhood name must be at most 50 characters long',
    'address.neighborhood.minLength': 'The neighborhood name must be at least 3 characters long',
    'address.number.unsigned': 'The address number must be a positive integer',
    'address.complement.maxLength': 'The complement must be at most 100 characters long',
    'address.complement.minLength': 'The complement must be at least 3 characters long',
  }
}
