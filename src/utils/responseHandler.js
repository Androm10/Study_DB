
module.exports = responseHandler = {
    
    sendSuccess : function(res, message, status) {
	
		res.status(status).json({
			type: 'success', message: message || 'Success result'
		});
	
	},

	sendError : function(res, error) {

        res.status(error.status || 500).json({
			type: 'error', message: error.message || 'Unhandled Error', error,
		});
    
	}
}