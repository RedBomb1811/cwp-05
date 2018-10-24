let articles = require('./articles.json');
const log = require('./log');
const file = require('fs').createWriteStream('./logfile.log');
function updateArticle(req, res, payload, cb) {
    let article = payload;
    const index = articles.articles.findIndex(article => article.id === payload.id);
    if (index !== -1) {
        articles.articles.splice(index, 1, article);
        log.log(file, '/api/articles/update', payload);
        cb(null, null);
    }
    else {
        cb('error');
    }
}
exports.updateArticle = updateArticle;