const { Sequelize } = require('sequelize');

let users = require('./users_model');
let operations = require('./operations_model');


const options = {
    host: '127.0.0.1',
    port: '3307',
    dialect: 'mysql'
}

const sequelize = new Sequelize('nostra_db', 'root', '1111', options);

try {
    sequelize.authenticate()
    console.log('server: connection to db completed');
  } catch (e) {
    console.log('server: cannot connect to db; ', e);
  }



sequelize.define(users[0], users[1], users[2]);
sequelize.define(operations[0], operations[1], operations[2]);

sequelize.sync();
module.exports = sequelize;