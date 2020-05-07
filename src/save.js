const fs = require('fs')
const path = require('path')
const superagent = require('superagent')
const cheerio = require('cheerio')
const axios = require('axios')

const partNavList = require('../data/formatPartData.json')
const departmentNavList = require('../data/formatDepartmentData.json')

const baseUrl = 'https://jb.9939.com/jbzz'

const FetchPageData = async (url) => {
  console.log(url)
  // axios.get(url).then(res => {
  //   const $ = cheerio.load(res.data)

  //   const pageMax = Number($('.paget').eq(-2).text())
  //   for (let i = 1; i <= pageMax; i++) {
  //     startSpiderData(`${url}/?page=${i}`)
  //   }
  // })
  //   superagent.get(url).end((err, res) => {
  //     // console.log(res)
  //     if (!err) {
  //       const $ = cheerio.load(res.text)
  //       //   console.log(res.text, res)
  //       const pageMax = Number($('paget').eq(-2).text())
  //       for (let i = 1; i <= pageMax; i++) {
  //         startSpiderData(`${url}/?page=${i}`)
  //       }
  //     }
  //   })
}

const startSpiderData = (url) => {
  console.log(url)
  // superagent.get(url).end((err, res) => {
  //   if (!err) {
  //     const $ = cheerio.load(res.text)
  //   }
  // })
}
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
    // FetchPageData(`${baseUrl}/${partItem1.partKey}/${departmentItem2.departmentKey}`)
  })
})
// const doGet = async () => {
//   for (const [index2, item2] of result.entries()) {
//     await FetchPageData(item2)
//   }
// }
// doGet()

const allList = path.join(__dirname, '../data/allList.json')
fs.writeFile(allList, JSON.stringify(result), () => {})
