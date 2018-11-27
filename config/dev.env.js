'use strict'

const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

const baseUrl = require('./server')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"' + baseUrl + '"'
})

