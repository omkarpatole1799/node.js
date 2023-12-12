const express = require('express')
const indexRoutes = require('./routes/indexRoutes')
// const bodyParser = require('body-parser')

const PORT = 3026
const app = express()

app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(express.json())
// app.use(bodyParser.json())

app.use('/', indexRoutes)

app.listen(PORT, function () {
  console.log('Server startd on port:', PORT)
})
