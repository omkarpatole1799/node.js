const express = require('express');
const livereload = require('livereload');
const connectLiveReload = require('connect-livereload');

const livereloadServer = livereload.createServer();
livereloadServer.server.once('connection', () => {
  setTimeout(() => {
    livereloadServer.refresh('/');
  }, 1);
});

const app = express();
app.set('view engine', 'pug');
app.use(connectLiveReload());
app.get('/', function (req, res) {
  res.render('test.pug');
});
app.get('/login', function(req, res){
  res.render('login.pug')
})

app.listen(3000);
