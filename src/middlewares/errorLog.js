const logger = require('../mongodb');

const mailer = require('../amqp');
const {mailTypes} = require('../config');

const userService = require('../services/userService');

module.exports = async function(error, req, res, next) {

    let errorLog = {

        name : error.name,
        
        message : error.message,
    
        date : Date.now()
    }
    
    logger.createErrorLog(errorLog);
    
    if(+error.status >= 500) {

        let devs = await userService.getAllDevs();

        for(let dev of devs) {
            
            let message = { 
                errorLog,
                email : dev.login,
                type : mailTypes.errorMail,    
            };

            mailer.sendToMailer(JSON.stringify(message));
        }
        
    }

    next(error);
}