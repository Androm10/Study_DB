const { Sequelize } = require('sequelize');


const options = {
    host: '127.0.0.1',
    port: '3307',
    dialect: 'mysql'
}

const sequelize = new Sequelize('nostra_db', 'root', '1111', options);

    sequelize.authenticate()
    .catch((e) => {
      console.log('server: cannot connect to db;' + e);
      return;
    });
    console.log('server: connection to db completed');
  


/*
users =       sequelize.define(users[0], users[1], users[2]);                    //note: to another file
operations =  sequelize.define(operations[0], operations[1], operations[2]);
wallets =     sequelize.define(wallets[0], wallets[1], wallets[2]);
userInfo =    sequelize.define(userInfo[0], userInfo[1], userInfo[2]);
roles =       sequelize.define(roles[0], roles[1], roles[2]);
bets =        sequelize.define(bets[0], bets[1], bets[2]);
results =     sequelize.define(results[0], results[1], results[2]);
events =      sequelize.define(events[0], events[1], events[2]);
usersRoles =  sequelize.define(usersRoles[0], usersRoles[1], usersRoles[2]);
*/
module.exports = sequelize;