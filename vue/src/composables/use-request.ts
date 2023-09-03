import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:3000',
})

// instance.interceptors.response.use()

instance.interceptors.response.use(
  (config) => config.data,
  Promise.reject
)

export default instance
