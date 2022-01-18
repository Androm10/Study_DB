let models = require('./models');

module.exports = {

    createHttpLog : async function(data) {
        let log = new models.httpLog(data);
        await log.save();
    },

    createDbLog : async function(data) {
        let log = new models.dbLog(data);
        await log.save();
    },

    createErrorLog : async function(data) {
        let log = new models.errorLog(data);
        await log.save();
    }

}