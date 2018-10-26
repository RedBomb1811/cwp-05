const logs = require("./logfile.json");
const fs = require('fs');

module.exports.log = function log(url, data) {
    const currentDate = new Date();
    logs.logs.push({
        dateDay: currentDate.getDay() + 1,
        dateMonth: currentDate.getMonth() + 1,
        dateYear: currentDate.getFullYear(),
        dateHours: currentDate.getHours(),
        dateMinutes: currentDate.getMinutes(),
        dateSeconds: currentDate.getSeconds(),
        URL: url,
        Request: JSON.stringify(data)
    });
    fs.writeFileSync('./logfile.json', JSON.stringify(logs));
};