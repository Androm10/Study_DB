const transporter = require('./initialize');
let brocker = require('amqplib').connect('amqp://localhost');
const config = require('./config');
const sender = require('./mails');


startListening();

async function startListening() {

    let channel = await (await brocker).createChannel();
    
    await channel.assertQueue('mailer', {durable: false});

    console.log('mailer: start listening');

    channel.consume('mailer', (msg) => {
        
        console.log("mailer: accepted message " + msg.content.toString());

        if(!msg)
            return;
        msg = JSON.parse(msg.content.toString());
        
        let context = {
            name: msg.nickname,
            company: 'Nostradamus',
            date : msg.date,
            ip : msg.ip,
            browser : msg.browser,
            errorName : msg?.errorLog.name,
            errorMessage : msg?.errorLog.message,
            errorDate : msg?.errorLog.date
        }
        
        switch(msg.type) {

            case (config.types.meet) : 
                sender.sendMeetMail(transporter, config.email, msg.email, context); 
                break;

            case (config.types.deleteAcc) : 
                sender.sendDeleteAccMail(transporter, config.email, msg.email, context); 
                break;

            case (config.types.changePassword) : 
                sender.sendChangePasswordMail(transporter, config.email, msg.email, context); 
                break;

            case (config.types.error) : 
                sender.sendErrorMail(transporter, config.email, msg.email, context); 
                break;
        }    
    
    }, {
        noAck: true
    });

};
