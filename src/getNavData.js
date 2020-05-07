const superagent = require('superagent')
const cheerio = require('cheerio')
const fs = require('fs')
const path = require('path')

const baseUrl = 'https://jb.9939.com/jbzz/'
let $ = null

superagent.get(baseUrl).end((err, res) => {
  if (!err) {
    const partData = getNavData(res, '.part-list1')
    const partDataFile = path.join(__dirname, '../data/partData.json')
    fs.writeFile(partDataFile, JSON.stringify(partData), () => {})

    const departmentData = getNavData(res, '.part-list2')
    const departmentDataFile = path.join(__dirname, '../data/departmentData.json')
    fs.writeFile(departmentDataFile, JSON.stringify(departmentData), () => {})
  }
})

// 按部位分类
const getNavData = (res, className) => {
  $ = cheerio.load(res.text)

  const result = []
  const partParentList = $('dl dt', `.allwords ${className}`)
  const otherPartParentList = $('div.smeo', `.allwords ${className}`)

  partParentList.each((index1, item1) => {
    $(item1).find('a').each((index2, item2) => {
      result.push({
        key: getKeyFromHref($(item2).attr('href')),
        name: $(item2).text(),
        child: getNavChildData(index1, className)
      })
    })
  })
  otherPartParentList.each((index1, item1) => {
    $(item1).find('a').each((index2, item2) => {
      result.push({
        key: getKeyFromHref($(item2).attr('href')),
        name: $(item2).text(),
        child: [{
          key: getKeyFromHref($(item2).attr('href')),
          name: $(item2).text(),
        }]
      })
    })
  })
  return result
}
const getNavChildData = (index, className) => {
  const result = []
  const partChildList = $('dl dd', `.allwords ${className}`)

  partChildList.map((index1, item1) => {
    if (index === index1) {
      $(item1).find('a').each((index2, item2) => {
        result.push({
          key: getKeyFromHref($(item2).attr('href')),
          name: $(item2).text()
        })
      })
    }
  })
  return result
}

const getKeyFromHref = (url) => {
  return url.replace(baseUrl, '')
    .replace(/\//g, '')
}

// superagent.get(baseUrl + '/jbzz/').end((err, res) => {
//   if (!err) {
//     const result = getTestData(res)
//     const file = path.join(__dirname, './test1.json');
//     fs.writeFile(file, JSON.stringify(result), () => {})
//   }
// })
// const getTestData = () => {
//   for (let index = 2; index < 1499; index++) {
//     const path = '?page=' + index
//     superagent.get()
//   }
// }
