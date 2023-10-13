const express = require('express')
const router = express.Router()

const { postLogData, getLogList } = require('../Controller/userController')

router.get('/logList', getLogList)

router.post('/addLog', postLogData)

module.exports = router
