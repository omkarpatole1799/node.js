exports.getLogin = function (req, res) {
    res.render("login.ejs",)
}

exports.postLogin = function (req, res) {
    const userData = {
        userId: req.body.userId,
        userPass: req.body.userPass
    }
    res.render('userPage.ejs',{
        userId: userData.userId,
    })

}
