let articles = require('./articles.json');
const log = require('./log');
const file = require('fs').createWriteStream('./logfile.log');

function readAll(req, res, payload, cb) {
    log.log(file, '/api/articles/readall', payload);
    if(payload.sortField === undefined)
        payload.sortField = 'date';
    if(payload.sortOrder === undefined)
        payload.sortOrder = 'desc';
    if(payload.page === undefined)
        payload.page = 1;
    if(payload.limit === undefined)
        payload.limit = 10;
    if(payload.includeDeps === undefined)
        payload.includeDeps = 'false';

    articles.articles.sort((a, b)=>{
        if((a[payload.sortField] > b[payload.sortField]) ^ (payload.sortOrder === 'asc'))
            return -1;
        if((a[payload.sortField] < b[payload.sortField]) ^ (payload.sortOrder === 'asc'))
            return 1;
        else return 0;
    });

    let begin = (payload.page - 1)*payload.limit;
    let end = begin + payload.limit;
    let reqArr = {};
    reqArr.items = articles.articles.slice(begin, end);
    reqArr.page = payload.page;
    reqArr.pages = Math.ceil(articles.articles.length / payload.limit);
    reqArr.count = articles.articles.length;
    reqArr.limit = payload.limit;

    if(payload.includeDeps === 'false')
        reqArr.items.forEach((elem)=>{
            elem.comments = [];
        });


    cb(null, reqArr);
}
exports.readAll = readAll;