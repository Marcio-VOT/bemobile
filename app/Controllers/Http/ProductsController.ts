import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'
import CreateProductValidator from 'App/Validators/CreateProductValidator'
import httpStatus from 'http-status'

export default class ProductsController {
  public async index ({ request: _req, response: res }: HttpContextContract) {
    res.send(
      (
        await Product.query()
          .whereNull('deleted_at')
          .orderBy('title', 'asc')
          .select('id', 'title', 'image', 'price', 'stock', 'category', 'author')
      )
    )
  }

  public async store ({ request: req, response: res }: HttpContextContract) {
    const payload = await req.validate(CreateProductValidator)
    const product = await Product.create(payload)

    res.status(httpStatus.CREATED)
    res.send({ product })
  }
}
