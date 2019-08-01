const axios = require('axios');
module.exports = {
  api: axios.create({
    baseURL: 'https://api.github.com/',
    timeout: 10000,
    //headers: {'X-Custom-Header': 'foobar'}
  })
}

