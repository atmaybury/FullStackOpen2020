import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const addPerson = newPerson => {
  const request = axios.post(baseUrl, newPerson)
  return request.then(response => response.data)
}

const removePerson = id => {
  return axios.delete(`${baseUrl}/${id}`)
}

const updateNumber = (id, newPerson) => {
  const request = axios.put(`${baseUrl}/${id}`, newPerson)
  return request.then(response => response.data)
}

export default { addPerson, removePerson, updateNumber }
