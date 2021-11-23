
const express = require('express');
const app = express();

const eventRouter = require('./src/routers/eventRouter');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/events', eventRouter);


function startServer(){
    try{
      app.listen(3000, () => {
        console.log('server: start listening');
      });
    }
    catch(error){
        console.log(error);
    }

}

startServer();





 
