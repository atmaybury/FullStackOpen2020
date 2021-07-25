import axios from 'axios'
import store from '../store'

const baseUrl = '/api/blogs'

// create bearer token for header
const setToken = () => {
  const state = store.getState()
  return `bearer ${state.user.token}`
}

// get all blogs
const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

// post new blog
const create = async newObject => {
  const token = setToken()
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const like = async id => {
  const response = await axios.put(`${baseUrl}/${id}`)
  return response.data
}

const addComment = async (blogId, comment) => {
  const token = setToken()
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(`${baseUrl}/${blogId}/comment`, { comment: comment }, config)
  return response.data
}

const deleteBlog = async id => {
  const token = setToken()
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default { getAll, create, like, addComment, deleteBlog }
