// adding user logs
const UserLog = require('../Model/logDataModel')

exports.postLogData = function (req, res) {
    console.log(req.body)
    const { log, projectTitle } = req.body
    const userId = req.userId
    UserLog.create({
        logInfo: log,
        projectTitle,
        UserId: userId,
    })
        .then((result) => {
            res.status(201).json({
                message: 'successfully added log',
                status: 201,
            })
        })
        .catch((err) => console.log(err))
}

// getting user log list
exports.getLogList = function (req, res) {
    const { id: userId } = req.params

    UserLog.findAll({
        attributes: ['logInfo', 'projectTitle'],
        where: {
            userId: Number(userId),
        },
        raw: true,
    })
        .then((result) => {
            console.log(result)
            return res.status(200).send({
                call: 1,
                data: result,
            })
        })
        .catch((err) => {
            return res.status(500).send({
                call: 0,
                data: err,
            })
        })
}
