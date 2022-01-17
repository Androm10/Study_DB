let brocker = require('amqplib').connect('amqp://localhost');

async function createQueue() {
    let ch = await (await brocker).createChannel();

    await ch.assertQueue('mailer', {durable: false});

    return ch;
}

let channel = createQueue();

exports.sendToMailer = async function(mail) {
    
    (await channel).sendToQueue('mailer', Buffer.from(mail));

}