const express = require('express')
const bodyParser = require('body-parser')
const app = express();
app.set('views', __dirname + '/views')
app.set('view engine', 'pug')
app.use(bodyParser.json())
app.get('/', (req, res)=>{
  res.render('index.pug')
})

app.listen(2555, () => {
  console.log('server started on port 2555')
})
