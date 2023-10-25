import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Client from 'App/Models/Client'

export default class ClientsController {
  public async index ({ request: _req, response: res }: HttpContextContract) {
    const clientList = await Client.all()
    res.send({clientList})
  }

  public async store ({ request: _req, response: res }: HttpContextContract) {
    const newClientSchema = schema.create({
      name: schema.string(),
      cpf: schema.string({}, [
        rules.maxLength(11),
        rules.minLength(11),
        rules.alphaNum(),
      ]),
      phone: schema.string({}, [
        rules.maxLength(20),
        rules.minLength(9),
        rules.alphaNum(),
      ]),
      address: schema.string(),
      city: schema.string(),
      state: schema.string(),
      country: schema.string(),
      zipCode: schema.string({}, [
        rules.maxLength(8),
        rules.minLength(8),
        rules.alphaNum(),
      ]),
    })
    const duplicatedClient = await Client.findBy('cpf', _req.body().cpf)
    res.abortIf(duplicatedClient, 'CPF already registered', 409)

    const client = await Client.create(_req.body())
    res.send({client})
  }
}
