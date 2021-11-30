
module.exports = (req, res, next) => {
    console.log('server: request to ' + req.url + 
    '\tmethod: ' + req.method +
    '\ntime: ' + new Date);
    next();
}