
const express = require('express');
const app = express();

const passport = require('./src/passport');
const fileUpload = require('express-fileupload');

const eventRouter = require('./src/routers/eventRouter');
const userRouter = require('./src/routers/userRouter');
const authRouter = require('./src/routers/authRouter');

app.use(fileUpload({}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

app.use('/events', eventRouter);
app.use('/user', userRouter);
app.use('/', authRouter);



function startServer() {
    try {
        app.listen(3000, () => {
            console.log('server: start listening');
        });
    }
    catch(error) {
        console.log(error);
    }
}

startServer();





 
