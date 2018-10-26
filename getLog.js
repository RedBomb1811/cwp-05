let logs = require('./logfile.json');
const log = require('./log');

function getLog(req, res, payload, cb) {
    log.log('/api/logs', payload);

    cb(null, logs);
}
exports.getLog = getLog;