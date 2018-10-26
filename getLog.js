let articles = require('./articles.json');
const log = require('./log');
const file = require('fs').createWriteStream('./logfile.json', {flags: 'a'});

function getLog(req, res, payload, cb) {
    log.log(file, '/api/articles/getLog', payload);

    articles.articles.sort((a, b)=>{
        if((a[payload.sortField] > b[payload.sortField]) ^ (payload.sortOrder === 'asc'))
            return -1;
        if((a[payload.sortField] < b[payload.sortField]) ^ (payload.sortOrder === 'asc'))
            return 1;
        else return 0;
    });

    let begin = (payload.page - 1)*payload.limit;
    let end = begin + payload.limit;
    let reqArr = {
        items : articles.articles.slice(begin, end),
        page : payload.page,
        pages : Math.ceil(articles.articles.length / payload.limit),
        count : articles.articles.length,
        limit : payload.limit
    };

    if(payload.includeDeps === 'false')
        reqArr.items.forEach((elem)=>{
            elem.comments = [];
        });


    cb(null, reqArr);
}
exports.getLog = getLog;