import axios from 'axios'

const isntance = axios.create({

    baseURL : "https://project-tempest-hiring.up.railway.app"

})

export default isntance