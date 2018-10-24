let articles = require('./articles.json');
const log = require('./log');
const file = require('fs').createWriteStream('./logfile.log');

function readAll(req, res, payload, cb) {
    log.log(file, '/api/articles/readall', payload);
    cb(null, articles.articles)
}
exports.readAll = readAll;