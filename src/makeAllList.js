const fs = require('fs')
const path = require('path')

const partNavList = require('../data/formatPartData.json')
const departmentNavList = require('../data/formatDepartmentData.json')

const baseUrl = 'https://jb.9939.com/jbzz'

const result = []

partNavList.map(partItem1 => {
  departmentNavList.map(departmentItem2 => {
    const path = `${baseUrl}/${partItem1.key}/${departmentItem2.key}`
    result.push({
      partKey: partItem1.key,
      partName: partItem1.name,
      departmentKey: departmentItem2.key,
      departmentName: departmentItem2.name,
      path
    })
  })
})

const allList = path.join(__dirname, '../data/allList.json')
fs.writeFile(allList, JSON.stringify(result), () => {})
