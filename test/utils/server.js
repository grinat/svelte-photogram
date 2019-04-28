const express = require('express')

const app = express()

const Img = () => ({
  path: 'image.jpg',
  nsfwScore: 0.4,
  createdAt: +new Date()
})

function initAndRun(config) {
  app.get('/faap/v1/sv_photo/*', function(req, res) {
    res.send(new Img()).end()
  })

  app.get('/faap/v1/sv_photo', function(req, res) {
    res.send({
      data: [
        new Img()
      ],
      _meta: {
        totalCount: 1
      }
    }).end()
  })

  return app.listen(config.port)
}

module.exports = app
module.exports.initAndRun = initAndRun
