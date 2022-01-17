const hbs = require('nodemailer-express-handlebars');
const nodemailer = require('nodemailer');
const path = require('path');
const config = require('./config');


// initialize nodemailer
let transporter = nodemailer.createTransport(
    {
        service: 'gmail',
        auth: {
            user: config.email,
            pass: config.pass
        }
    }
);

const handlebarOptions = {
    viewEngine: {
        partialsDir: path.resolve('./templates/'),
        defaultLayout: false,
    },
    viewPath: path.resolve('./templates/'),
};

// use a template file with nodemailer
transporter.use('compile', hbs(handlebarOptions));

module.exports = transporter;