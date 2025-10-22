import axios from 'axios'

const BaseURL = import.meta.env.MODE === 'development'? "http://localhost:3000/codereview":"/codereview"

const api=axios.create({
    baseURL: BaseURL
})

export default api