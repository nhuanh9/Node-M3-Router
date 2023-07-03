import fs from "fs";
import productService from "../service/productService.js";
import qs from "qs";
import url from "url";

class ProductController {

    showAll(req, res) {
        let data = '';
        req.on('data', dataRaw => {
            data += dataRaw;
        })
        req.on('end', () => {
            if (req.method === 'GET') {
               showList(req, res);
            } else {
                data = qs.parse(data);
                productService.save(data).then(() => {
                    res.writeHead(302, {
                        Location: '/products',
                        });
                    res.end();
                })
            }
        })
    }

    edit(req, res) {
        let data = '';
        req.on('data', dataRaw => {
            data += dataRaw;
        })
        req.on('end', () => {
            if (req.method === 'GET') {
                fs.readFile('view/product/edit.html', 'utf-8', (err, stringHTML) => {
                    let urlObject = url.parse(req.url, true)
                    productService.findById(urlObject.query.idEdit).then((product) => {
                        stringHTML = stringHTML.replace('{id}', product.id);
                        stringHTML = stringHTML.replace('{name}', product.name);
                        stringHTML = stringHTML.replace('{price}', product.price);
                        stringHTML = stringHTML.replace('{quantity}', product.quantity);
                        stringHTML = stringHTML.replace('{image}', product.image);
                    res.write(stringHTML);
                    res.end();
                    });
                })

            } else {
                data = qs.parse(data);
                productService.update(data).then(() => {
                    res.writeHead(302, {
                        Location: `/products`,
                    });
                showList(req, res);
                })
            }
        })
    }

    showFormAdd(req, res) {
        fs.readFile('view/product/add.html', 'utf-8', (err, stringHTML) => {
            res.write(stringHTML);
            res.end();
        })
    }

    delete(req, res) {
        const urlObject = url.parse(req.url, true);
        const productId = urlObject.query.id;
        // console.log(productId);
        productService.deleteProduct(productId).then(() => {
            res.write("Deleted");
            res.end();
        });
    }
}

function showList(req, res) {
    fs.readFile('view/product/list.html', 'utf-8', (err, stringHTML) => {
        let str = '';
        productService.findAll().then((products)=> {
            for (const product of products) {
                str+=`<h3>${product.name}</h3>
                <a href="products/edit-product?idEdit=${product.id}"><button type="button" class="btn bx bxs-edit-alt btn-button">Edit</button></a>
                <button onclick="sendFetchDelete(${product.id})" type="button" class="btn bx bx-x">X</button>
                `
            }
            stringHTML = stringHTML.replace('{list}', str)
            res.write(stringHTML);
            res.end();
        })
    })
}

export default new ProductController();
