'use strict'

var fs = require('fs')
var path = require('path')
var argument = process.argv.splice(2)
var server = ''

if (argument[0] === 'build') { // 测试
  server = 'http://test.weimaipay.com:8070/'  // 微脉 地址通过替换由后端执行
// }
// else if (argument[0] === 'yfb') { // 预发布
//   server = 'http://www.weimaipay.com:8070/'
// } else if (argument[0] === 'production') { // 生产（线上）
//   server = 'http://www.weimaipay.com:8070/'
} else if (argument[0] === 'development') { // 开发
  server = ''
}

function writeServerFile() {
  var data = 'module.exports = ' + JSON.stringify(server);
  fs.writeFile(path.join(__dirname, 'server.js'), data, function (err) {
    if (err) {
      throw err;
    }
    console.log('change server is successful: ' + server);
  })
}

writeServerFile();

