const partNavList = require('../data/partData.json')
const departmentNavList = require('../data/departmentData.json')

console.log(partNavList, departmentNavList)
const result = []

partNavList.map(partItem1 => {
  if (partItem.child) {
    partItem.child.map(partItem2 => {
      departmentNavList.map(departmentItem1 => {

      })
    })
  }
})
