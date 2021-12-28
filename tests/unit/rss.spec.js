const expect = require('chai').expect
const axios = require('axios')
const Parser = require('rss-parser')
const parser = new Parser()

const { getRSSUrl } = require('../../src/add_rss')
const { testPages } = require('../utils/series')

describe('RSS link tests', () => {
  context('Should be able to download a valid RSS file from built URL', () => {
    for (const page of testPages) {
      it(`For page ${page.name}`, async () => {
        const url = getRSSUrl(page.id)
        const response = await axios.get(url)
        const body = response.data
        const result = await parser.parseString(body)
        expect(result).to.deep.include({
          title: page.title,
          link: `https://tapas.io/series/${page.id}`
        })
      })
    }
  })
})
