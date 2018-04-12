const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const dbConfig = require('./config/db')

const app = express()

const port = 5000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// mongoose default promise library is depricated
mongoose.Promise = global.Promise

mongoose.connect(dbConfig.url)
  .then((database) => {
    const routes = require('./app/routes')

    app.use('/api', routes)

    app.listen(port, () => {
      console.log(`We are live on ${port}`)
    })
  })
  .catch((err) => {
    console.log(`Error connecting: ${err}`)
    process.exit(1)
  })
