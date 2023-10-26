import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Address from 'App/Models/Address'
import Client from 'App/Models/Client'
import Phone from 'App/Models/Phone'
import CreateClientValidator from 'App/Validators/CreateClientValidator'
import UpdateClientValidator from 'App/Validators/UpdateClientValidator'
import httpStatus from 'http-status'

export default class ClientsController {
  public async index ({ request: _req, response: res }: HttpContextContract) {
    const clientList = await Client.query().select('id', 'name', 'cpf').preload('phone', (query)=> {
      query.select('phone')
    }).orderBy('id', 'asc')
    res.send({clientList})
  }

  public async store ({ request: req, response: res }: HttpContextContract) {
    const payload = await req.validate(CreateClientValidator)
    const trx = await Database.transaction()

    try {
      const client = await Client.create({...payload.client}, {client: trx})
      const clientPhone = await Phone.create({phone: payload.phone, client_id: client.id}, {client: trx})
      const clientAddress = await Address.create({...payload.address, client_id: client.id}, {client: trx})

      await trx.commit()
      res.status(httpStatus.CREATED)
      res.send({client, clientPhone, clientAddress})
    } catch (error) {
      await trx.rollback()
      res.status(httpStatus.BAD_REQUEST)
      res.send({message: error.message})
    }
  }

  public async destroy ({ params: { id }, response: res }: HttpContextContract) {
    const client = await Client.findBy('id', id)
    if(!client){
      res.status(httpStatus.NOT_FOUND)
      return res.send({message: 'Client not found'})
    }
    client.delete()
    res.send({message: 'Client deleted'})
  }

  public async show ({ params: { id } , response: res, request: req }: HttpContextContract) {
    const {month, year} = req.qs() as {month: number | undefined, year: number | undefined}

    const client = await Client.query()
      .preload('address')
      .preload('phone')
      .preload('sales', (query) => {
        if(month && year){
          const date = new Date(year, month-1, 1)
          query.where('created_at', '>=', date.toISOString())
        }
        query.orderBy('created_at', 'desc')
      })
      .where('id', id)
      .first()

    if(!client){
      res.status(httpStatus.NOT_FOUND)
      return res.send({message: 'Client not found'})
    }

    res.send(client)
  }

  public async update ({ params: { id }, request: req, response: res }: HttpContextContract) {
    const payload = await req.validate(UpdateClientValidator)

    const client = await Client.findBy('id', id)
    const phone = await Phone.findBy('client_id', id)
    const address = await Address.findBy('client_id', id)

    if(!client || !phone || !address){
      res.status(httpStatus.NOT_FOUND)
      return res.send({message: 'Client data not found', client, phone, address})
    }

    await client.merge({...payload.client}).save()
    await phone.merge({phone: payload.phone}).save()
    await address.merge({...payload.address}).save()

    res.send({message: 'Client updated'})
  }
}
