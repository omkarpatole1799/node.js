const express = require('express')
const indexRoutes = require('./routes/indexRoutes')
const path = require('path')
const PORT = 3026
const app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))

app.set('view engine', 'ejs')
app.use(express.json())

app.use('/', indexRoutes)

app.listen(PORT, function () {
  console.log('Server startd on port:', PORT)
})
