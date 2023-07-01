import {Product} from "../model/product.js";
import connection from "../model/connection.js";

class ProductService {
    constructor() {
    }

    findAll() {
        connection.connecting()
        return new Promise((resolve, reject) => {
            connection.getConnection().query('select * from product', (err, products) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(products);
                }
            });
        })
    }

    save(product) {
        return new Promise((resolve, reject) => {
            connection.getConnection().query(`insert into product VALUES (${+product.id}, '${product.name}', ${product.price} , ${+product.quantity}, '${+product.image}')`, (err, products) => {
                if (err) {
                    reject(err);
                } else {
                    console.log('Create Success !!!');
                    resolve(products)
                }
            });
        })
    }

    findById(id) {
    }
}

export default new ProductService();
