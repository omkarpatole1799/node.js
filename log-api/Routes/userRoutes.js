const express = require('express');
const   router = express.Router();

const { postLogData, getLogList } = require('../Controller/userController');

router.post('/addLog', postLogData);

router.get('/logList', getLogList);

module.exports = router;
