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
            company: 'Nostradamus'
        }
        
        switch(msg.type) {

            case (config.types.meet) : 
                sender.sendMeetMail(transporter, config.email, msg.email, context); 
                break;

            case (config.types.deleteAcc) : 
                sender.sendDeleteAccMail(transporter, config.email, msg.email, context); 
                break;
        }    
        
        /*
        var mailOptions = {
            from: '"Anders" ' + `<${config.email}>`, 
            to: msg.email, 
            subject: 'Welcome!',
            template: 'email', 
            context:{
                name: msg.nickname, 
                company: 'Nostradamus'
            }
        };
            
            // trigger the sending of the E-mail
        transporter.sendMail(mailOptions, function(error, info) {
            if(error){
                return console.log(error);
            }
            console.log('Message sent: ' + info.response);
        });    
        */
            
    }, {
        noAck: true
    });

};
