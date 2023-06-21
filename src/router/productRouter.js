import fs from 'fs'
import productService from "../service/productService.js";
import qs from "qs";

let productRouter = {
    '/products': (req, res) => {
        let data = ''
        req.on('data', (dataRaw) => {
            data += dataRaw;
        })
        req.on('end', () => {
            if (req.method === 'GET') {
                showList(req, res)
            } else {
                productService.add(qs.parse(data));
                showList(req, res)
            }
        })
    },
    '/add-product': (req, res) => {
        fs.readFile('view/product/add.html', 'utf-8', (err, stringHTML) => {
            res.write(stringHTML);
            res.end();
        })
    },
}

function showList(req, res) {
    fs.readFile('view/product/list.html', 'utf-8', (err, stringHTML) => {
        let list = productService.findAll();
        let str = '';
        for (const item of list) {
            str += `<h2>${item.id}. ${item.name}: ${item.price}<button>Delete</button></h2>`;
        }
        stringHTML = stringHTML.replace('{list}', str)
        res.write(stringHTML);
        res.end();
    })
}

export default productRouter;
