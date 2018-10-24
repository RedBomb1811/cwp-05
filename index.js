const http = require('http');
const fs = require('fs');
const { readAll } = require('./readAll');
const { read } = require("./read");
const { createArticle } = require("./createArticle");
const { deleteArticle } = require("./deleteArticle");
const { updateArticle } = require("./updateArticle");

const hostname = '127.0.0.1';
const port = 3000;
let articles;

const handlers = {
    '/api/articles/readall': readAll,
    '/api/articles/read': read,
    '/api/articles/create': createArticle,
    '/api/articles/update': updateArticle,
    '/api/articles/delete': deleteArticle,
    // '/api/comments/create': createComment,
    // '/api/comments/delete': deleteComment
};

let data = fs.readFileSync('articles.json');
articles = JSON.parse(data);

const server = http.createServer((req, res) => {
    parseBodyJson(req, (err, payload) => {
        const handler = getHandler(req.url);
        handler(req, res, payload, (err, result) => {
            if (err) {
                res.statusCode = err.code;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(err));
                return;
            }
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(result));
        });
    });
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
function getHandler(url) {
    return handlers[url] || notFound;
}

function notFound(req, res, payload, cb) {
    cb({code: 404, message: 'Not found'});
}

function parseBodyJson(req, cb) {
    let body = [];
    req.on('data', function (chunk) {
        body.push(chunk);
    }).on('end', function () {
        body = Buffer.concat(body).toString();
        let params = body !== "" ? JSON.parse(body) : {};
        cb(null, params);
    });
}