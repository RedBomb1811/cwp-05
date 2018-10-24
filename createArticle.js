let articles = require('./articles.json');
const log = require('./log');
const fs = require('fs');
const file = require('fs').createWriteStream('./logfile.log');
function createArticle(req, res, payload, cb) {
    let article = payload;
    article.id = articles.articles.length;
    articles.articles.push(article);
    if (article) {
        log.log(file, '/api/articles/create', payload);
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