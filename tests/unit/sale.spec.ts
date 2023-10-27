import { faker } from '@faker-js/faker'
import { test } from '@japa/runner'
import Client from 'App/Models/Client'
import Product from 'App/Models/Product'
import User from 'App/Models/User'
import httpStatus from 'http-status'
import { DateTime } from 'luxon'

test.group('Sale', async () => {
  test('create a sale', async ({client}) => {
    const client01 = await Client.create({
      name: faker.person.firstName(),
      cpf: `${faker.number.int({max: 99_999_999_999, min: 10_000_000_000})}`,
    })

    const user = await User.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
    })

    const product01 = await Product.create({
      author: 'Author 01',
      category: 'Category 01',
      description: 'Description 01',
      image: 'Image 01',
      price: 10,
      stock: 300,
      isbn: faker.string.alphanumeric(10),
      title: 'Title 01',
      published_at: DateTime.local(),
      deleted_at: null,
    })

    const response = client
      .post('/api/sales')
      .form({
        client_id: client01.id,
        product_id: product01.id,
        quantity: 10,
      })
      .guard('api');

    (await response.loginAs(user)).assertStatus(httpStatus.CREATED)
  })
})
