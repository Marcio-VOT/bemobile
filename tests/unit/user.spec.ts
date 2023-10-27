import { faker } from '@faker-js/faker'
import { test } from '@japa/runner'
import User from 'App/Models/User'
import httpStatus from 'http-status'

test.group('User', async () => {
  const [email, password] = [faker.internet.email(), faker.internet.password()]
  const user = await User.create({ email, password })

  test('should create a new user', async ({client}) => {
    const [email, password] = [faker.internet.email(), faker.internet.password()]
    const response = await client.post('api/signup').form({ email, password })
    response.assertStatus(httpStatus.CREATED)
  })

  test('should login a user', async ({client}) => {
    const response = await client.post('api/login').form({ ...user.toJSON(), password })
    response.assertStatus(httpStatus.OK)
  })
})
