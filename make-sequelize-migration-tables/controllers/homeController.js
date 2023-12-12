const fs = require('fs')
const homeController = {
  getIndexView: function (req, res) {
    return res.render('index.ejs')
  },
}
module.exports = homeController
