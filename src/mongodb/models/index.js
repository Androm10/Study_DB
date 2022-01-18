const mongoose = require('../mongoose');

const dbLog = require('./dbLogModel');
const httpLog = require('./httpLogModel');
const errorLog = require('./errorLogModel');

module.exports = {
    dbLog : dbLog,
    httpLog : httpLog,
    errorLog : errorLog
}