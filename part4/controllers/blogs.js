const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

// SET TO /api/blogs //

// return all blogs
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

// add new blog
blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const user = request.user
  
  // error checking
  if (!user) {
    return response.status(401).json({ error : 'missing user auth token' })
  }
  if (!body.title || !body.url) {
    return response.status(400).json({ error : 'title and url are both required' })
  }
  body.likes = body.likes ? body.likes : 0
   
  // save blog to db
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })
  const savedBlog = await blog.save()

  // save ID of new blog to user's profile
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(200).json(savedBlog)
})

// get blog by id
blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    return response.json(blog)
  } else {
    return response.status(404).end()
  }
})

// remove blog
blogsRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  const user = request.user

  if (blog) {
    // verify that user matches author of blog
    if (user._id.toString() !== blog.user.toString()) {
      return response.json({ error: 'user id does not match blog author' })
    }
    await Blog.findByIdAndRemove(request.params.id)
    return response.status(204).end()
  } else {
    return response.status(404).end()
  }
})

// update likes for blog
blogsRouter.put('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  const updatedBlog = {
    likes: blog.likes + 1
  }

  const updated = await Blog.findByIdAndUpdate(request.params.id, updatedBlog, { new: true, runValidators: true, context: 'query' }).populate('user', { username: 1, name: 1 })
  return response.json(updated)
})

module.exports = blogsRouter
