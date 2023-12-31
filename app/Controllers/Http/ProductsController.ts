import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'
import CreateProductValidator from 'App/Validators/CreateProductValidator'
import UpdateProductValidator from 'App/Validators/UpdateProductValidator'
import httpStatus from 'http-status'
import { DateTime } from 'luxon'

export default class ProductsController {
  public async index ({ request: _req, response: res }: HttpContextContract) {
    res.send(
      (
        await Product.query()
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

  public async destroy ({ params: { id }, response: res }: HttpContextContract) {
    const product = await Product.find(id)

    if(product?.deleted_at !== null || !product){
      res.status(httpStatus.NOT_FOUND)
      return res.send({ message: 'Product not found' })
    }

    product.deleted_at = DateTime.now()
    await product.save()

    res.send({ message: 'Product deleted' })
  }

  public async show ({ params: { id }, response: res }: HttpContextContract) {
    const product = await Product.query().where('id', id).first()

    if(!product){
      res.status(httpStatus.NOT_FOUND)
      return res.send({ message: 'Product not found' })
    }

    res.send({ product })
  }

  public async update ({ params: { id }, request: req, response: res }: HttpContextContract) {
    const payload = await req.validate(UpdateProductValidator)
    const product = await Product.find(id)

    if(!product){
      res.status(httpStatus.NOT_FOUND)
      return res.send({ message: 'Product not found' })
    }

    product.merge(payload)
    await product.save()

    res.send({ product })
  }
}
