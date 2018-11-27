'use strict'

const baseUrl = require('./server')

module.exports = {
  NODE_ENV: '"production"',
  BASE_API: '\'' + baseUrl + '\''
}
