import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {  
token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newObject => {
  const config = {
    headers: { 'Authorization': token}
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const put = async (objectId, updatedObject) => {
  const config = {
    headers: { 'Authorization': token}
  }

  const response = await axios.put(baseUrl+`/${objectId}`, updatedObject, config)
  return response.data
}

const deleteBlog = async objectId => {
  const config = {
    headers: { 'Authorization': token}
  }
  await axios.delete(baseUrl+`/${objectId}`, config)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, setToken, put, deleteBlog }