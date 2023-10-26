import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Product from 'App/Models/Product'
import Sale from 'App/Models/Sale'
import CreateSaleValidator from 'App/Validators/CreateSaleValidator'
import httpStatus from 'http-status'

export default class SalesController {
  public async store ({ request: req, response: res }: HttpContextContract) {
    const payload = await req.validate(CreateSaleValidator)

    const product = await Product.find(payload.product_id)
    if (!product || product?.deleted_at !== null) {
      res.status(httpStatus.NOT_FOUND)
      return res.send({message: 'Product not found'})
    }

    if(product.stock < payload.quantity) {
      res.status(httpStatus.CONFLICT)
      return res.send({message: 'Product stock is not enough'})
    }

    const trx = await Database.transaction()
    try {
      const sale = await Sale.create({
        ...payload,
        total_price: product.price * payload.quantity,
        unit_price: product.price,
      }, {client: trx})

      await product.merge({stock: product.stock - payload.quantity}).useTransaction(trx).save()

      await trx.commit()

      res.status(httpStatus.CREATED)
      res.send(sale)
    } catch (error) {
      await trx.rollback()
      res.abort(error.message, httpStatus.BAD_REQUEST)
    }
  }
}
