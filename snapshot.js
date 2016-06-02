var fs = require('fs');
var profiler = require('v8-profiler');

function Snapshot(delay,dirName) {
    var dirName = dirName || './snapshot/';
    var delay = delay || 1000 * 60*60;
    fs.exists(dirName, function (exists) {
        if (!exists) {
            fs.mkdirSync(dirName);
        }
    });
    setInterval(function () {
        var snapshot = profiler.takeSnapshot();
        snapshot.export(function (error, result) {
            if (error) {
                console.log("snapshot error：", err)
            }

            fs.writeFile(dirName + (new Date()).toLocaleString().replace(/[^0-9]{1,}/g, '_') + '.heapsnapshot', result, function (err) {
                if (err) {
                    console.log("snapshot error：", err)
                }
            });
        });
    }, delay);
}

module.exports = Snapshot;