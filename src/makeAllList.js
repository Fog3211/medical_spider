const fs = require('fs')
const path = require('path')

const partNavList = require('../data/formatPartData.json')
const departmentNavList = require('../data/formatDepartmentData.json')

const baseUrl = 'https://jb.9939.com/jbzz'

const result = []

partNavList.map(partItem1 => {
  departmentNavList.map(departmentItem2 => {
    const path = `${baseUrl}/${partItem1.partKey}/${departmentItem2.departmentKey}`
    result.push({
      partKey: partItem1.partKey,
      partName: partItem1.partName,
      departmentKey: departmentItem2.departmentKey,
      departmentName: departmentItem2.departmentName,
      key: departmentItem2.key,
      name: departmentItem2.name,
      path
    })
  })
})

const allList = path.join(__dirname, '../data/allList.json')
fs.writeFile(allList, JSON.stringify(result), () => {})
