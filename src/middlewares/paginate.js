const config = require('../config');
const paginate = require('express-paginate');

module.exports = paginate.middleware(
    config.pagination.limit,
    config.pagination.maxLimit
    );