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
}

let productService = new ProductService();
export default productService;
