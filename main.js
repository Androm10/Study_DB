const express = require('express');
const app = express();

const passport = require('./src/passport');
const fileUpload = require('express-fileupload');

const eventRouter = require('./src/routers/eventRouter');
const userRouter = require('./src/routers/userRouter');
const authRouter = require('./src/routers/authRouter');

const errorHandler = require('./src/middlewares/errorHandler');
const errorLog = require('./src/middlewares/errorLog');
const httpLog = require('./src/middlewares/httpLog');

const jobs = require('./src/jobs');

app.use(fileUpload({}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());


app.use(httpLog);

app.use('/events', eventRouter);
app.use('/user', userRouter);
app.use('/', authRouter);

app.use(errorLog);
app.use(errorHandler);



function startServer() {
    try {
        app.listen(3000, () => {
            console.log('server: start listening');

            setTimeout(jobs.autoDelete, 5000);
        });
    }
    catch(error) {
        console.log(error);
    }
}

startServer();





 
