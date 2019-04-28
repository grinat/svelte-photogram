const chai = require('chai')
const expect = chai.expect
chai.should()

import {wait} from './utils/helpers'
import {PORT} from "../src/config"

const PhotoView = require('../src/modules/photo/View.svelte').default
const PhotoFeed = require('../src/modules/photo/Feed.svelte').default

let app = null
let server = null

describe('photo', function() {
  before(async () => {
    app = require('./utils/server')
    server = require('./utils/server').initAndRun({
      port: PORT
    })
  })

  after(async () => {
    await new Promise(resolve => server.close(resolve))
  })

  it('view', async () => {
    const app = new PhotoView({
      target: document.body,
      props: {}
    })

    await wait()

    expect(document.body.innerHTML).to.contain('<img')
    expect(document.body.innerHTML).to.contain('src="image.jpg')
  })

  it('feed', async () => {
    const app = new PhotoFeed({
      target: document.body,
      props: {}
    })

    await wait()

    expect(document.body.innerHTML).to.contain('<img')
    expect(document.body.innerHTML).to.contain('src="image.jpg')
  })
})
