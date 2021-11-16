

module.exports = function(status, errorMessage) {

        let e = new Error(errorMessage || 'Default Error');
        e.status = status;
        return e;
}