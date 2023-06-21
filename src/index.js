import http from 'http';
import fs from 'fs';
import qs from 'qs';
import url from 'url';
import router from "./router/router.js";

const server = http.createServer((req, res) => {
    var parseUrl = url.parse(req.url, true);
    var queryStringObject = parseUrl.query;
    console.log(queryStringObject)
    let handle = router[req.url];
    if (handle === undefined) {
        handle = router['/err'];
    }
    handle(req, res);
});
server.listen('8080', () => {
    console.log('Đã kết nối')
})
