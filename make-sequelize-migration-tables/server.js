const express = require('express')
const PORT = 3026
const app = express()
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.get('/', function (req, res) {
  res.render('index.ejs')
})
app.listen(PORT, function () {
  console.log('Server startd on port:', PORT)
})
