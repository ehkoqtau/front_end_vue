/* global localStorage */

import axios from 'axios'

const API_URL = process.env.API_URL || 'https://ph.barelangit.com/index.php/api'

export default axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.token
  }
})
