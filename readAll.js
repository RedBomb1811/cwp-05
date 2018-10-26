let articles = require('./articles.json');
const log = require('./log');
const file = require('fs').createWriteStream('./logfile.log');

function readAll(req, res, payload, cb) {
    log.log(file, '/api/articles/readall', payload);
    if(payload.sortField === undefined)
        payload.sortField = 'date';
    if(payload.sortOrder === undefined)
        payload.sortOrder = 'desc';

    articles.articles.sort((a, b)=>{
        if((a[payload.sortField] > b[payload.sortField]) ^ (payload.sortOrder === 'asc'))
            return -1;
        if((a[payload.sortField] < b[payload.sortField]) ^ (payload.sortOrder === 'asc'))
            return 1;
        else return 0;
    });
    cb(null, articles.articles)
}
exports.readAll = readAll;