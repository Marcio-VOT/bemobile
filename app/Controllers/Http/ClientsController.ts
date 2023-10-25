import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Address from 'App/Models/Address'
import Client from 'App/Models/Client'
import Phone from 'App/Models/Phone'
import CreateClientValidator from 'App/Validators/CreateClientValidator'

export default class ClientsController {
  public async index ({ request: _req, response: res }: HttpContextContract) {
    const clientList = await Client.query().preload('address').preload('phone').orderBy('id', 'asc')
    res.send({clientList})
  }

  public async store ({ request: req, response: res }: HttpContextContract) {
    const payload = await req.validate(CreateClientValidator)

    const duplicatedClient = await Client.findBy('cpf', payload.client.cpf)
    res.abortIf(duplicatedClient, 'CPF already registered', 409)

    const client = (await Client.create({...payload.client}))
    const clientPhone = await Phone.create({phone: payload.phone, client_id: client.id})
    const clientAddress = await Address.create({...payload.address, client_id: client.id})

    res.send({client, clientPhone, clientAddress})
  }

  public async destroy ({ params: { id }, response: res }: HttpContextContract) {
    const client = await Client.findByOrFail('id', id)
    client.delete()
    res.send({message: 'Client deleted'})
  }
}
