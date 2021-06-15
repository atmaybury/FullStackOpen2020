const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: "test1",
    author: "author1",
    url: "test1url",
    likes: 1,
  },
  {
    title: "test2",
    author: "author2",
    url: "test2url",
    likes: 2,
  }
]

const newBlog = {
  title: "new blog",
  author: "new author",
  url: "newblogurl",
  likes: 666,
}

const noLikesBlog = {
  title: "no likes blog",
  author: "no likes author",
  url: "nolikesurl",
}

const noTitleBlog = {
  author: "no title author",
  url: "notitleurl",
  likes: 3,
}

const noUrlBlog = {
  title: "no url blog",
  author: "no url author",
  likes: 4,
}

const noAuthTokenBlog = {
  title: "new blog",
  author: "new author",
  url: "newblogurl",
  likes: 666,
}

const updatedBlog = {
  likes: 10
}

module.exports = {
  initialBlogs,
  newBlog,
  noLikesBlog,
  noTitleBlog,
  noUrlBlog,
  noAuthTokenBlog,
  updatedBlog
}
