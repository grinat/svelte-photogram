const express = require('express')
const fs = require('fs')

const app = express()

app.use(express.static(__dirname + '/dist'))

// history fallback
app.use(function(req, res){
  res.sendFile(__dirname + '/dist/index.html')
})

const port = process.env.PORT || 5166

app.listen(port, () => {
  console.log(`Static server run at http://localhost:${port}`)
})
