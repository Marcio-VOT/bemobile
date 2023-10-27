import { faker } from '@faker-js/faker'
import { test } from '@japa/runner'
import User from 'App/Models/User'
import httpStatus from 'http-status'

test.group('Client', async () => {
  const cpfC = faker.number.int({max: 99_999_999_999, min: 10_000_000_000})
  const user = await User.create({
    email: faker.internet.email(),
    password: faker.internet.password(),
  })

  test('should create a new client', async ({client}) => {
    const response = client.post('api/clients')
      .form({
        client:{
          name: faker.person.firstName(),
          cpf: `${cpfC}`,
        },
        phone: `${cpfC}`,
        address:{
          zip_code: '83410300',
          country: 'Brazil',
          state: 'Paraná',
          city: 'Colombo',
          street: 'Jaguariaíva',
          neighborhood: 'Paloma',
          number:'875',
        },
      }
      ).guard('api')
    ;

    (await response.loginAs(user)).assertStatus(httpStatus.CREATED)
  })

  test('should list all clients', async ({client}) => {
    const response = client.get('/api/clients').guard('api');

    (await response.loginAs(user)).assertStatus(httpStatus.OK)
  })

  test('should show a client', async ({client}) => {
    const response = client.get(`/api/clients/${user.id}`).guard('api');

    (await response.loginAs(user)).assertStatus(httpStatus.OK)
  }
  )
})

