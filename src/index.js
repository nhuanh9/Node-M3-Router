import http from 'http';
import fs from 'fs';
import qs from 'qs';
import url from 'url';
import router from "./router/router.js";

const server = http.createServer((req, res) => {
    let urlObject = url.parse(req.url, true)
    let handle = router[urlObject.pathname];
    if (handle === undefined) {
        handle = router['/err'];
    }
    handle(req, res);
});
server.listen('8080', () => {
    console.log('Đã kết nối')
})
