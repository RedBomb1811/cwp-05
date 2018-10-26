let articles = require('./articles.json');
const log = require('./log');
const fs = require('fs');

function createArticle(req, res, payload, cb) {
    let article = payload;
    article.id = articles.articles.length;
    article.date = Date.now();
    articles.articles.push(article);
    if (article) {
        log.log('/api/articles/create', payload);
        fs.writeFile('./articles.json', JSON.stringify(articles), (err)=>{
            if(err)
                throw Error(err);
            cb(null, article);
        });
    }
    else {
        cb('error');
    }
}
exports.createArticle = createArticle;