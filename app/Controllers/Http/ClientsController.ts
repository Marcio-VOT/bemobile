import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Address from 'App/Models/Address'
import Client from 'App/Models/Client'
import Phone from 'App/Models/Phone'
import CreateClientValidator from 'App/Validators/CreateClientValidator'
import httpStatus from 'http-status'

export default class ClientsController {
  public async index ({ request: _req, response: res }: HttpContextContract) {
    const clientList = await Client.query().preload('phone', (query)=> {
      query.select('phone')
    }).orderBy('id', 'asc')
    res.send({clientList})
  }

  public async store ({ request: req, response: res }: HttpContextContract) {
    const payload = await req.validate(CreateClientValidator)

    const duplicatedClient = await Client.findBy('cpf', payload.client.cpf)
    res.abortIf(duplicatedClient, 'CPF already registered', httpStatus.CONFLICT)

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
      res.abort(error.message, httpStatus.BAD_REQUEST)
    }
  }

  public async destroy ({ params: { id }, response: res }: HttpContextContract) {
    (await Client.findByOrFail('id', id)).delete()
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
      .firstOrFail()

    res.send(client)
  }
}
