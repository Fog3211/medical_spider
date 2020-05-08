const fs = require('fs')
const path = require('path')

const notFoundList = require('../data/notFoundList.json')
const allList = require('../data/allList.json')

notFoundList.map(item1 => {
  allList.map((item2, index2) => {
    if (item2 && item2.path === item1) {
      allList[index2] = null
    }
  })
})
const result = allList.filter(Boolean)


const realAllList = path.join(__dirname, '../data/allList.json')
fs.writeFile(realAllList, JSON.stringify(result), () => {})

const newNotFoundList = path.join(__dirname, '../data/notFoundList.json')
fs.writeFile(newNotFoundList, JSON.stringify([]), () => {})
