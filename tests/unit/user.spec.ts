import { faker } from '@faker-js/faker'
import { test } from '@japa/runner'

test.group('User', () => {
  const [email, password] = [faker.internet.email(), faker.internet.password()]

  test('should create a new user', async ({client}) => {
    const response = await client.post('api/signup').form({ email, password })
    response.assertStatus(201)
  })
  test('should login a user', async ({client}) => {
    const response = await client.post('api/login').form({ email, password })
    response.assertStatus(200)
  })
})
