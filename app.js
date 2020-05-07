const superagent = require('superagent')
const cheerio = require('cheerio')
const fs = require('fs')
const path = require('path');

const baseUrl = 'https://jb.9939.com/jbzz/'

superagent.get(baseUrl).end((err, res) => {
  if (!err) {
    const result = getPartData(res)
    const file = path.join(__dirname, './test.json');
    fs.writeFile(file, JSON.stringify(result), () => {})
  }
})

// 按部位分类
const getPartData = (res) => {
  const result = []
  const $ = cheerio.load(res.text)

  $('ul.lefna li dl').each((index1, item1) => {

    const titleList = $(item1).find('dt a')

    titleList.each((index2, item2) => {
      result.push({
        name: $(item2).text(),
        href: baseUrl + $(item2).attr('href'),
        child: getPartChildData(item1, $),
        key: getKeyByUrl($(item2).attr('href'))
      })
    })
  })
  return result
}

const getPartChildData = (item, $) => {
  const result = []
  const contentList = $(item).find('dd a')
  contentList.each((index1, item1) => {
    result.push({
      name: $(item1).text(),
      href: baseUrl + $(item1).attr('href'),
      key: getKeyByUrl($(item1).attr('href'))
    })
  })
  return result
}

const getKeyByUrl = (url) => {
  return url.replace(baseUrl, '')
    .replace('jbzz', '')
    .replace(/\//g, '')
}

superagent.get(baseUrl + '/jbzz/').end((err, res) => {
  if (!err) {
    const result = getTestData(res)
    const file = path.join(__dirname, './test1.json');
    fs.writeFile(file, JSON.stringify(result), () => {})
  }
})
const getTestData = () => {
  for (let index = 2; index < 1499; index++) {
    const path = '?page=' + index
    superagent.get()
  }
}
