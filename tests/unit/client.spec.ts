import { faker, faker } from '@faker-js/faker'
import { test } from '@japa/runner'
import Address from 'App/Models/Address'
import Client from 'App/Models/Client'
import Phone from 'App/Models/Phone'
import User from 'App/Models/User'
import httpStatus from 'http-status'

test.group('Client', async () => {
  const user = await User.create({
    email: faker.internet.email(),
    password: faker.internet.password(),
  })

  test('should create a new client', async ({client}) => {
    const response = client.post('api/clients')
      .form({
        client:{
          name: faker.person.firstName(),
          cpf: `${faker.number.int({max: 99_999_999_999, min: 10_000_000_000})}`,
        },
        phone: `${faker.number.int({max: 99_999_999_999, min: 10_000_000_000})}`,
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
  const clientO = await Client.create({
    name: faker.person.firstName(),
    cpf: `${faker.number.int({max: 99_999_999_999, min: 10_000_000_000})}`,
  })
  await Phone.create({
    phone: `${faker.number.int({max: 99_999_999_999, min: 10_000_000_000})}`,
    client_id: clientO.id,
  })
  await Address.create({
    zip_code: '83410300',
    country: 'Brazil',
    state: 'Paraná',
    city: 'Colombo',
    street: 'Jaguariaíva',
    neighborhood: 'Paloma',
    number:875,
    client_id: clientO.id,
    complement: 'Casa',
  })
  test('should show a client', async ({client}) => {
    const response = client.get(`/api/clients/${clientO.id}`).guard('api');

    (await response.loginAs(user)).assertStatus(httpStatus.OK)
  }
  )

  test('should update a client', async ({client}) => {
    const response = client.patch(`/api/clients/${clientO.id}`)
      .form({
        client:{
          name: faker.person.firstName(),
          cpf: `${faker.number.int({max: 99_999_999_999, min: 10_000_000_000})}`,
        },
      }
      ).guard('api')
    ;

    (await response.loginAs(user)).assertStatus(httpStatus.OK)
  })

  test('should delete a client', async ({client}) => {
    const response = client.delete(`/api/clients/${clientO.id}`).guard('api');

    (await response.loginAs(user)).assertStatus(httpStatus.OK)
  })
})

