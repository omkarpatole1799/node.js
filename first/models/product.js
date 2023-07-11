const products = []
module.exports = class Product{
    constructor (t){
        this.title = t;
    }

    save(){
        products.push({product_name: this.title})
    }

    static fetchAll (){
        return products
    }
}