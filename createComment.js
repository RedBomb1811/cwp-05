let articles = require('./articles.json');
const log = require('./log');
const fs = require("fs");
const file = require('fs').createWriteStream('./logfile.json', {flags: 'a'});
function createComment(req, res, payload, cb) {
    let comment = payload;
    const article = articles.articles.find(article => article.id === payload.articleId);
    comment.id = article.comments.length;
    comment.date = Date.now();
    if (article) {
        article.comments.push(comment);
        log.log(file, '/api/comments/create', payload);
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
exports.createComment = createComment;