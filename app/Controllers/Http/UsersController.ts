// import { Hash } from '@adonisjs/core/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import CreateUserValidator from 'App/Validators/CreateUserValidator'
import httpStatus from 'http-status'

export default class UsersController {
  public async signup ({ request: req, response: res, auth }: HttpContextContract) {
    const data = await req.validate(CreateUserValidator)
    const user = await User.create(data)

    const token = await auth.use('api').generate(user, {
      expiresIn: '7 days',
    })

    res.status(httpStatus.CREATED)
    return res.send({user, token})
  }

  public async login ({ request: req, response: res, auth }: HttpContextContract) {
    const { email, password } = req.only(['email', 'password'])
    try {
      const token = await auth.use('api').attempt(email, password, {
        expiresIn: '7 days',
      })
      return res.send(token)
    } catch (error) {
      return res.unauthorized('Invalid credentials')
    }
  }
}
