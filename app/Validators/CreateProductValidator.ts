import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateProductValidator {
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
  public schema = schema.create({
    title: schema.string({}, [
      rules.maxLength(80),
      rules.minLength(3),
    ]),
    author: schema.string({}, [
      rules.maxLength(80),
      rules.minLength(3),
    ]),
    description: schema.string({}, [
      rules.maxLength(1000),
      rules.minLength(10),
    ]),
    isbn: schema.string({}, [
      rules.maxLength(13),
      rules.minLength(10),
      rules.unique({ table: 'products', column: 'isbn' }),
    ]),
    image: schema.string({}, [
      rules.maxLength(255),
      rules.minLength(3),
      rules.url(),
    ]),
    price: schema.number([
      rules.unsigned(),
      rules.range(0, 100000),
    ]),
    stock: schema.number([
      rules.unsigned(),
      rules.range(0, 100000),
    ]),
    category: schema.string({}, [
      rules.maxLength(80),
      rules.minLength(3),
    ]),
    published_at: schema.date(),
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
    'title.maxLength': 'The title must be at most 80 characters long',
    'title.minLength': 'The title must be at least 3 characters long',
    'author.maxLength': 'The author name must be at most 80 characters long',
    'author.minLength': 'The author name must be at least 3 characters long',
    'description.maxLength': 'The description must be at most 1000 characters long',
    'description.minLength': 'The description must be at least 10 characters long',
    'isbn.maxLength': 'The ISBN must be at most 13 characters long',
    'isbn.minLength': 'The ISBN must be at least 10 characters long',
    'isbn.unique': 'The ISBN must be unique',
    'image.maxLength': 'The image URL must be at most 255 characters long',
    'image.minLength': 'The image URL must be at least 3 characters long',
    'image.url': 'The image URL must be a valid URL',
    'price.unsigned': 'The price must be a positive number',
    'price.range': 'The price must be between 0 and 100000',
    'stock.unsigned': 'The stock must be a positive number',
    'stock.range': 'The stock must be between 0 and 100000',
    'category.maxLength': 'The category name must be at most 80 characters long',
    'category.minLength': 'The category name must be at least 3 characters long',
  }
}
