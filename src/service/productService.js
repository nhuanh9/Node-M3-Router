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

    add(product) {
        this.list.push(product)
    }

    update(productEdit) {
        for (let i = 0; i < this.list.length; i++) {
            if (this.list[i].id == productEdit.id) {
                this.list[i] = productEdit;
            }
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
