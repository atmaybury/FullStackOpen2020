const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const User = require('../models/user')
const helper = require('../utils/users_test_helper')

describe('when there is initially one root user in db', ()=> {
  beforeEach(async () => {
    // wipe db
    await User.deleteMany({})
    console.log('cleared db') 
    // add root user
    const passwordHash = await bcrypt.hash('root', 10)
    const user = new User({ username: 'root', name: 'root', passwordHash })
    await user.save()
    console.log('created root user')
  })

  test('root user exists', async () => {
    const users = await User.find({})
    expect(users).toHaveLength(1)
  })

  test('new user is created via post', async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser = {
      username: 'newuser',
      name: 'new user',
      password: 'newuser'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
  })

  test('user created without username returns error 400', async () => {
    const newUser = {
      password: 'password',
      name: 'new user'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })

  test('user created without password returns error 400', async () => {
    const newUser = {
      username: 'newuser',
      name: 'new user'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })

  test('username with less than 3 characters returns error 400', async () => {
    const newUser = {
      username: 'ab',
      password: 'password',
      name: 'new user'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })

  test('password with less than 3 characters returns error 400', async () => {
    const newUser = {
      username: 'username',
      password: 'ab',
      name: 'new user'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })
  
  afterAll(() => {
    mongoose.connection.close()
  })
})
