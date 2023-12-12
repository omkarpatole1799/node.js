const express = require('express')
const router = express.Router()
const homeController = require('../controllers/homeController.js')
const fs = require('fs')
const path = require('path')
router.get('/', homeController.getIndexView)

router.post('/post-sequelize-script', (req, res) => {
  fs.writeFileSync(
    path.join(__dirname, 'public', 'created-scripts', 'migrationScript.js'),
    req.body.script
  )
  res.status(201).json({
    success: 1,
    message: 'File has been successfully written.',
  })
})

router.get('/get-sequelize-file', (req, res) => {
  console.log('downloading file')
  res.download(
    path.join(__dirname, 'public', 'created-scripts', 'migrationScript.js'),
    function (err) {
      if (err) {
        console.log('error occured')
      } else {
        fs.unlinkSync(
          path.join(
            __dirname,
            'public',
            'created-scripts',
            'migrationScript.js'
          )
        )
      }
    }
  )
})

module.exports = router
