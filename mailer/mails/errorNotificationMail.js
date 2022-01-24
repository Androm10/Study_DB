module.exports = function(transporter, from, to, context) {

    var mailOptions = { 
        from: '"Nostradamus mailer" ' + `<${from}>`, 
        to: to, 
        subject: 'Critical error',
        template: 'errorNotification', 
        context : context
    };
        
        // trigger the sending of the E-mail
    transporter.sendMail(mailOptions, function(error, info) {
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });    
}