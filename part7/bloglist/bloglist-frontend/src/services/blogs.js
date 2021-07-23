import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

// create bearer token for header
const setToken = newToken => {
  token = `bearer ${newToken}`
}

// get all blogs
const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

// post new blog
const create = async newObject => {
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

const deletePost = async id => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default { setToken, getAll, create, like, deletePost }
