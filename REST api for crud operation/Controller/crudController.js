const crudModel = require("../Model/crudModel");

// get data from db
exports.getData = function (req, res) {
    crudModel
        .getData()
        .then((data) => {
            if (data[0] == "") {
                res.status(400).json({ message: "not found" });
            }
            res.status(200).json([{ message: "success" }, { data: data[0] }]);
        })
        .catch((err) => {
            res.status(400).json({ message: err.message });
        });
};

// get by id
exports.getById = function (req, res) {
    let id = req.params.id;
    crudModel
        .getById(id)
        .then((responseData) => {
            if (responseData[0] == "") {
                res.status(400).json({ message: "not found" });
            }
            res.status(200).json([
                { message: "success" },
                { data: responseData[0][0] },
            ]);
        })
        .catch((err) => {
            console.log(err);
        });
};

// insert data into db
exports.postData = function (req, res) {
    console.log(req.body);
    return;
    let itemName = req.body.itemName;
    let itemDescription = req.body.itemDescription;
    let itemPrice = req.body.itemPrice;
    // let itemPhoto = req.body.itemPhoto;
    // console.log("item photo", itemPhoto)

    crudModel
        .postData(itemName, itemDescription, itemPrice)
        .then(() => {
            res.status(201).json({
                message: "Success adding data",
            });
        })
        .catch((err) => console.log(err));
};

exports.postUpdateData = function (req, res) {
    let itemId = req.body.itemId;
    let itemName = req.body.itemName;
    let itemDescription = req.body.itemDescription;
    let itemPrice = req.body.itemPrice;
    crudModel
        .postUpdateData(itemId, itemName, itemDescription, itemPrice)
        .then(() => {
            res.status(201).json({
                message: "Success updating data",
            });
        })
        .catch((err) => console.log(err));
};

// delete data from db
exports.deleteData = function (req, res) {
    let id = req.params.id;
    let found = true;
    crudModel
        .getById(id)
        .then((responseData) => {
            if (responseData[0] == "") {
                res.status(400).json({ message: "not found" });
                found = false;
            }
        })
        .catch();

    if (found) {
        crudModel
            .deleteData(id)
            .then((data) => {
                res.status(201).json({
                    message: "Success deleting data",
                });
            })
            .catch((err) => console.log(err));
    }
};
