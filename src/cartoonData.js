const fs = require('fs')
const path = require('path')

const originList = require('../data/originList.json')

let result = []

originList.map(item => {
  item.edus.map(u => {
    result.push({
      title: u.header_name,
      link: u.short_url,
      imgSrc: u.image_url,
      pushNumber: u.send_num
    })
  })
})
console.log(result)

const originListResult = path.join(__dirname, '../data/originListResult.json')
fs.writeFile(originListResult, JSON.stringify(result), () => {})
