import {Product} from "../model/product.js";

class ProductService {
    constructor() {
        this.list = [];
        this.list.push(new Product(1, 'A', 1200));
        this.list.push(new Product(2, 'B', 1200));
        this.list.push(new Product(3, 'C', 1200));
        this.list.push(new Product(4, 'D', 1200));
        this.list.push(new Product(5, 'E', 1200));
    }

    findAll() {
        return this.list;
    }

    save(product) {
        let checkExist = false;
        for (let i = 0; i < this.list.length; i++) {
            if (this.list[i].id == product.id) {
                this.list[i] = product;
                checkExist = true;
            }
        }
        if (!checkExist) {
            this.list.push(product)
        }
    }

    findById(id) {
        for (const product of this.list) {
            if (product.id == id) {
                return product
            }
        }
    }
}

export default new ProductService();
