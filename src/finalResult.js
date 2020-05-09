const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')
const path = require('path')

const baseUrl = 'https://jb.9939.com/'
const resultData = require('../data/resultData.json')

const result = []

const FetchDiseaseData = async (params) => {
  const {
    key
  } = params
  return axios.get(baseUrl + key + '/jianjie/').then((res) => {
    const $ = cheerio.load(res.data)
    const introduction = $('.disea .bshare p').text().trim()
    const alias = $('.dicoc span').text().replace(/（|）/g, '').trim()
    const crowd = $('.protex>p').last().text().replace('多发人群：', '').trim()
    const treatment = $('.aknol>p').last().text().replace('治疗方法', '').trim()
    let yaopin = ''
    $('.aknol>.refl a').each((i, u) => yaopin += $(u).text() + '，')

    result.push({
      ...params,
      introduction,
      alias,
      crowd,
      treatment
    })
    const finalResultFile = path.join(__dirname, '../data/finalResult.json')
    fs.writeFile(finalResultFile, JSON.stringify(result), () => {})

  }).catch(err => {
    console.log('err')
  })
}
let count = 0
const doGetData = async () => {
  console.log('start')

  for (const [index2, item2] of resultData.entries()) {
    console.log('index2', index2)
    if (index2 === resultData.length - 1) {
      console.log('finish')
    }
    count++
    if (count >= 20) {
      count = 0
      await FetchDiseaseData(item2)
    } else {
      FetchDiseaseData(item2)
    }
  }
}

doGetData()
