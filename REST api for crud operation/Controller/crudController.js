const crudModel = require("../Model/crudModel");

// get data from db
exports.getData = function (req, res) {
    crudModel
        .getData()
        .then((data) => {
            res.json(data[0]);
        })
        .catch((err) => console.log(err));
};

// insert data into db
exports.postData = function (req, res) {
    let itemName = req.body.itemName;
    let itemDescription = req.body.itemDescription;
    let itemPrice = req.body.itemPrice;
    crudModel
        .postData(itemName, itemDescription, itemPrice)
        .then(() => {
            console.log("Success adding data");
        })
        .catch((err) => console.log(err));
};

// delete data from db
exports.deleteData = function (req, res) {
    let id = req.params.id;
    crudModel
        .deleteData(id)
        .then(() => {
            console.log("deleted successful", id);
        })
        .catch((err) => console.log(err));
};
