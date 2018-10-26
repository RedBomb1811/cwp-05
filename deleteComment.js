let articles = require('./articles.json');
const log = require('./log');
const fs = require("fs");
const file = require('fs').createWriteStream('./logfile.json', {flags: 'a'});
function deleteComment(req, res, payload, cb) {
    try {
        let commentD = payload;
        let index;
        const article = articles.find(article => (index = article.comments.findIndex(comment => comment.id == commentD.articleId)) !== -1);
        if (article) {
            article.comments.splice(index, 1);
            log.log(file, '/api/comments/delete', payload);
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
    catch (exception) {
        console.log(exception.message);
    }
}
exports.deleteComment = deleteComment;