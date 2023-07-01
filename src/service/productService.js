import {Product} from "../model/product.js";

class ProductService {
    constructor() {
        this.list = [];
        this.list.push(new Product(1, 'A', 1200, 'https://znews-photo.zingcdn.me/w660/Uploaded/dqvpxpck/2022_10_16/101422_2023_ducati_panigale_v4_r_099_UC440899.jpg'));
        this.list.push(new Product(2, 'B', 1200, 'https://minhlongmoto.com/wp-content/uploads/2019/04/Ducati-Panigale-28.jpg'));
        this.list.push(new Product(3, 'C', 1200, 'https://cms-i.autodaily.vn/du-lieu/2020/07/14/ducati-panigale-v4r-16.jpg'));
        this.list.push(new Product(4, 'D', 1200, 'https://znews-photo.zingcdn.me/w660/Uploaded/lce_cjvcc/2023_03_13/kawasaki_ninja_h2r_gia_2_ty_zing_7.jpg'));
        this.list.push(new Product(5, 'E', 1200, 'https://thegioibiker.com/wp-content/uploads/2022/01/Kawasaki-H2-va-H2R-khac-nhau-nhung-gi.jpg'));
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
