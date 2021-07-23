const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const blogsData = require('../utils/blogs_test_helper')

let token

beforeEach(async () => {

  // clear users db and create test user
  await User.deleteMany({})
  console.log('cleared users db')
  const password = 'test'
  const passwordHash = await bcrypt.hash(password, 10)
  const user = new User({ username: 'test', name: 'test', passwordHash })
  await user.save()
  const response = await api.post('/api/login').send({ username: user.username, password: password })
  token = response.body.token
  console.log('created test user')

  // clear blogs db and create initial blogs
  await Blog.deleteMany({})
  console.log('cleared blogs db')
  const blogObjects = blogsData.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
  console.log('initialized db')
})

// TESTS //

describe('blogs are returned correctly', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-type', /application\/json/)
  })

  test('correct amount of blogs returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(blogsData.initialBlogs.length)
  })

  test('contains blog with title \'test1\'', async () => {
    const response = await api.get('/api/blogs')
    const titles = response.body.map(i => i.title)
    expect(titles).toContain('test1')
  })

  test('id is defined', async () => {
    const blog = await api.get('/api/blogs')
    expect(blog.body[0].id).toBeDefined()
  })
})

describe('can add blogs via post', () => {
  // add userID of first user in db (should always be test user)
  const newBlog = blogsData.newBlog

  test('saves blog to db', async () => {
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer ${token}`)
      .expect(200)
      .expect('Content-type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(blogsData.initialBlogs.length + 1)
  })

  test('if request is missing likes property, blog defaults to 0 likes', async () => {
    await api
      .post('/api/blogs')
      .send(blogsData.noLikesBlog)
      .set('Authorization', `bearer ${token}`)
      .expect(200)
      .expect('Content-type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body[blogsData.initialBlogs.length].likes).toEqual(0)
  })

  test('if request is missing title property, backend responds with 400 Bad Request', async () => {
    await api
      .post('/api/blogs')
      .send(blogsData.noTitleBlog)
      .set('Authorization', `bearer ${token}`)
      .expect(400)
  })
  
  test('if request is missing url property, backend responds with 400 Bad Request', async () => {
    await api
      .post('/api/blogs')
      .send(blogsData.noUrlBlog)
      .set('Authorization', `bearer ${token}`)
      .expect(400)
  })

  // TODO blog controller now takes user from request object
  // need to change test for request which is missing token
  test('if request is missing auth token, backend responds with 401 Unauthorized', async () => {
    await api
      .post('/api/blogs')
      .send(blogsData.noAuthTokenBlog)
      .expect(401)
  })
})

describe('can delete or update single posts', ()=> {
  test('can update likes on a post', async () => {
    const response = await api.get('/api/blogs')
    const blogId = response.body[0].id
    await api
      .put(`/api/blogs/${blogId}`)
      .send(blogsData.updatedBlog)
      .expect(200)
    
    const updated = await api.get(`/api/blogs/${blogId}`)
    expect(updated.body.likes).toEqual(2)
  })

  test('can delete single post', async ()=> {
    const newBlog = blogsData.newBlog
    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer ${token}`)
    const blogId = response.body.id
    await api
      .delete(`/api/blogs/${blogId}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204)
    const blogs = await api.get('/api/blogs')
    expect(blogs.body[0].id).not.toEqual(newBlog.id)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
