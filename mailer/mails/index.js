const sendDeleteAccMail = require('./deleteNotificationMail');
const sendMeetMail = require('./meetMail');
const sendChangePasswordMail = require('./passwordNotification');
const sendErrorMail = require('./errorNotificationMail');

module.exports = { 
    sendDeleteAccMail, 
    sendMeetMail, 
    sendChangePasswordMail,
    sendErrorMail
};