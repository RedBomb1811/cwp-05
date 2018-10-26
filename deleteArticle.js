let articles = require('./articles.json');
const log = require('./log');
const fs = require("fs");

function deleteArticle(req, res, payload, cb) {
    const index = articles.articles.findIndex(article => article.id === payload.id);
    if (index !== -1) {
        articles.articles.splice(index, 1);
        log.log('/api/articles/delete', payload);
        fs.writeFile('./articles.json', JSON.stringify(articles), (err)=>{
            if(err)
                throw Error(err);
            cb(null, null);
        });
    }
    else {
        cb('error');
    }
}
exports.deleteArticle = deleteArticle;