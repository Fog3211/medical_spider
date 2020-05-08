const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')
const path = require('path')

const baseUrl = 'https://jb.9939.com'
const allList = require('../data/allList.json')

const result = []
const notFoundList = []

const getKeyFromHref = (url) => {
  return url.replace(baseUrl, '')
    .replace(/\//g, '')
}

const startSpiderData = (url, params) => {
  const {
    partKey,
    partName,
    departmentKey,
    departmentName
  } = params

  axios.get(url).then((res) => {
    const $ = cheerio.load(res.data)
    const titleList = $('.doc_anwer .subtit .cation h3 a')

    titleList.each((index1, item1) => {
      result.push({
        key: getKeyFromHref($(item1).attr('href')),
        name: $(item1).text().replace('\n', '').replace('\t', ''),
        partKey,
        partName,
        departmentKey,
        departmentName
      })
    })
    // console.log(result)
    const resultData = path.join(__dirname, '../data/resultData.json')
    fs.writeFile(resultData, JSON.stringify(result), () => {})

  }).catch(err => {
    console.log('err', err)
  })
}

const FetchPageData = async (params) => {
  const url = params.path
  // console.log(path)
  return axios.get(url).then((res) => {
    if (res.data.indexOf('暂未找到符合条件的信息') !== -1) {
      notFoundList.push(url)
      const notFoundListFile = path.join(__dirname, '../data/notFoundList.json')
      fs.writeFile(notFoundListFile, JSON.stringify(notFoundList), () => {})
    }
    const $ = cheerio.load(res.data)

    const pageMax = $('.paget a').eq(-2).text() || 1

    for (let i = 1; i <= pageMax; i++) {
      console.log('pageMax', pageMax, i)
      startSpiderData(`${url}/?page=${i}`, params)
    }
  }).catch(err => {
    console.log('err', err)
  })
}

const doGetData = async () => {
  console.log('start')

  for (const [index2, item2] of allList.entries()) {
    console.log('index2', index2)
    if (index2 === allList.length - 1) {
      console.log('finish')
    }
    await FetchPageData(item2)
  }
}

doGetData()
