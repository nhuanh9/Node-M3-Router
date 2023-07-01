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
        req.on('end', async () => {
            if (req.method === 'GET') {
                showList(req, res);
            } else {
                data = qs.parse(data);
                await productService.save(data)
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
        let str = '';
        productService.findAll().then((products) => {
            for (const item of products) {
                str += `
                            <article class="hentry">
                                <header class="entry-header">
                                    <div class="entry-thumbnail">
                                        <a href="portfolio-item.html"><img src="${item.image}" style="width: 100%; height: 200px" alt="p1"/></a>
                                    </div>
                                    <h2 class="entry-title"><a href="portfolio-item.html" rel="bookmark">${item.name}</a></h2>
                                    <a class='portfoliotype' href='portfolio-category.html'>${item.price}</a>
                                </header>
                            </article>`;
            }
            stringHTML = stringHTML.replace('{list}', str)
            res.write(stringHTML);
            res.end();
        })
    })
}

export default new ProductController();
