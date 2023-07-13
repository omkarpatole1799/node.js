const fs = require('fs')

module.exports = class Product {
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }

    save() {
        this.id = Math.random()
        let products = []

        const p = 'productsData.json'

        fs.readFile(p, (err, fileContent) => {
            if (!err) {
                products = JSON.parse(fileContent)
            }
            products.push({ title: this.title, price: this.price, id: this.id })

            fs.writeFile(p, JSON.stringify(products), err => {
                err ? console.log("error") : "";
            })
        })
    }

    static fetchAll(cb) {
        const p = 'productsData.json'
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                cb([])
            }
            cb(JSON.parse(fileContent))
        })
    }
}