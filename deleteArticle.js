let articles = require('./articles.json');
const log = require('./log');
const fs = require("fs");
const file = require('fs').createWriteStream('./logfile.json', {flags: 'a'});
function deleteArticle(req, res, payload, cb) {
    const index = articles.articles.findIndex(article => article.id === payload.id);
    if (index !== -1) {
        articles.articles.splice(index, 1);
        log.log(file, '/api/articles/delete', payload);
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