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
                let checkObj = productService.findById(data.id);
                if (checkObj !== undefined) {
                    productService.update(data)
                } else {
                    productService.add(data);
                }
                showList(req, res);
            }
        })
    }

    showFormEdit(req, res) {
        fs.readFile('view/product/edit.html', 'utf-8', (err, stringHTML) => {
            let urlObject = url.parse(req.url, true)
            let proEdit = productService.findById(urlObject.query.idEdit)
            stringHTML = stringHTML.replace('{id}', proEdit.id);
            stringHTML = stringHTML.replace('{name}', proEdit.name);
            stringHTML = stringHTML.replace('{price}', proEdit.price);
            res.write(stringHTML);
            res.end();
        })
    }

    showFormAdd(req, res) {
        fs.readFile('view/product/add.html', 'utf-8', (err, stringHTML) => {
            res.write(stringHTML);
            res.end();
        })
    }


}

function showList(req, res) {
    fs.readFile('view/product/list.html', 'utf-8', (err, stringHTML) => {
        console.log(err)
        let str = '';
        for (const item of productService.findAll()) {
            str += `<h2>${item.id}. ${item.name}: ${item.price} <button><a href="/edit-product?idEdit=${item.id}">Edit</a></button><button>Delete</button> </h2>`;
        }
        stringHTML = stringHTML.replace('{list}', str)
        res.write(stringHTML);
        res.end();
    })
}

export default new ProductController();
