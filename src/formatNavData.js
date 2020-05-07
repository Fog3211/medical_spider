const fs = require('fs')
const path = require('path')

const partNavList = require('../data/partData.json')
const departmentNavList = require('../data/departmentData.json')


const formatAllData = () => {
  const formatPartNavList = formatPartData()
  const formatDepartmentNavList = formatDepartmentData()

  const formatPartDataFile = path.join(__dirname, '../data/formatPartData.json')
  fs.writeFile(formatPartDataFile, JSON.stringify(formatPartNavList), () => {})

  const formatDepartmentDataFile = path.join(__dirname, '../data/formatDepartmentData.json')
  fs.writeFile(formatDepartmentDataFile, JSON.stringify(formatDepartmentNavList), () => {})
}

const formatPartData = () => {
  const result = []
  partNavList.map(item1 => {
    item1.child.map(item2 => {
      result.push({
        key: item2.key,
        name: item2.name,
        partKey: item1.key,
        partName: item1.name,
      })
    })
  })
  return result
}

const formatDepartmentData = () => {
  const result = []
  departmentNavList.map(item1 => {
    item1.child.map(item2 => {
      result.push({
        key: item2.key,
        name: item2.name,
        departmentKey: item1.key,
        departmentName: item1.name,
      })
    })
  })
  return result
}

formatAllData()
