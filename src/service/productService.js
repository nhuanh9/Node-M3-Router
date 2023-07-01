import connection from "../connection.js";


class ProductService {
    constructor() {
        connection.connecting();
    }

    findAll() {
        return new Promise((resolve, reject) => {
            connection.getConnection().query('select * from product', (err, products) => {
                if (err) {
                    reject(err)
                } else {
                    console.log(products)
                    resolve(products)
                }
            })
        })
    }

    save(product) {
    }

    findById(id) {
    }
}

export default new ProductService();
