let articles = require('./articles.json');
const log = require('./log');
const fs = require("fs");

function updateArticle(req, res, payload, cb) {
    let article = payload;
    const index = articles.articles.findIndex(article => article.id === payload.id);
    if (index !== -1) {
        articles.articles.splice(index, 1, article);
        log.log('/api/articles/update', payload);
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
exports.updateArticle = updateArticle;