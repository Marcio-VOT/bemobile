import { faker } from '@faker-js/faker'
import { test } from '@japa/runner'
import Product from 'App/Models/Product'
import User from 'App/Models/User'
import httpStatus from 'http-status'
import { DateTime } from 'luxon'

test.group('Product', async () => {
  const user = await User.create({
    email: faker.internet.email(),
    password: faker.internet.password(),
  })
  const product = await Product.create({
    author: faker.person.firstName(),
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    isbn: faker.string.alphanumeric(10),
    image: faker.image.url(),
    price: faker.number.int({max: 282}),
    stock: faker.number.int({max: 1000}),
    category: faker.commerce.department(),
    published_at: DateTime.now(),
    deleted_at: null,
  })
  test('should create a new product', async ({client}) => {
    const response = client.post('api/products')
      .form({
        title: faker.commerce.productName(),
        author: faker.person.firstName(),
        description: faker.commerce.productDescription(),
        isbn: faker.string.alphanumeric(10),
        image: faker.image.url(),
        price: faker.commerce.price({max: 282}),
        stock: faker.number.int({max: 1000}),
        category: faker.commerce.department(),
        published_at: faker.date.past(),
      }
      ).guard('api');

    (await response.loginAs(user)).assertStatus(httpStatus.CREATED)
  })
  test('should list all products', async ({client}) => {
    const response = client.get('/api/products').guard('api');

    (await response.loginAs(user)).assertStatus(httpStatus.OK)
  })

  test('should update a product', async ({client}) => {
    const response = client.put(`/api/products/${product.id}`)
      .form({
        title: faker.commerce.productName(),
      }).guard('api');
    (await response.loginAs(user)).assertStatus(httpStatus.OK)
  })

  test('should delete a product', async ({client}) => {
    const response = client.delete(`/api/products/${product.id}`).guard('api');
    (await response.loginAs(user)).assertStatus(httpStatus.OK)
  })

  test('should show a product', async ({client}) => {
    const response = client.get(`/api/products/${product.id}`).guard('api');
    (await response.loginAs(user)).assertStatus(httpStatus.OK)
  })
})
