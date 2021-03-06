import axios from 'axios'

const baseUrl = '/api/persons'

const get = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const deletePerson = id => {
  return axios.delete(`${baseUrl}/${id}`)
}

// eslint-disable-next-line
export default { get, create, update, deletePerson }