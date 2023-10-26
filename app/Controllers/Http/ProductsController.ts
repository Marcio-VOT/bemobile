import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'
import httpStatus from 'http-status'

export default class ProductsController {
  public async index ({ request: _req, response: res }: HttpContextContract) {
    res.send(
      (
        await Product.query()
          .select('id', 'title', 'image', 'price', 'stock', 'category', 'author')
          .orderBy('title', 'asc')
      )
    )
  }
}
