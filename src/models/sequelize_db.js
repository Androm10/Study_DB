const { Sequelize } = require('sequelize');

let users       = require('./users_model');
let operations  = require('./operations_model');
let wallets     = require('./wallets_model'); 
let user_info   = require('./user_info_model');
let roles       = require('./roles_model');
let bets        = require('./bets_model');
let results     = require('./results_model');
let events      = require('./events_model');
let users_roles = require('./users_roles_model');


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



users =       sequelize.define(users[0], users[1], users[2]);
operations =  sequelize.define(operations[0], operations[1], operations[2]);
wallets =     sequelize.define(wallets[0], wallets[1], wallets[2]);
user_info =   sequelize.define(user_info[0], user_info[1], user_info[2]);
roles =       sequelize.define(roles[0], roles[1], roles[2]);
bets =        sequelize.define(bets[0], bets[1], bets[2]);
results =     sequelize.define(results[0], results[1], results[2]);
events =      sequelize.define(events[0], events[1], events[2]);
users_roles = sequelize.define(users_roles[0], users_roles[1], users_roles[2]);

users.hasOne( user_info, { foreignKey: 'user_id' });
users.hasOne( wallets, { foreignKey: 'user_id' });
users.belongsToMany( roles, { through: 'users_roles', foreignKey: 'user_id', otherKey: 'role_id' });
users.hasMany( bets, { foreignKey: 'user_id' });
wallets.hasMany( operations, { foreignKey: 'wallet_id' });
results.hasMany( bets, { foreignKey: 'result_id' });
events.hasMany( results,{ foreignKey: 'event_id' });
events.belongsTo( users,{ foreignKey: 'creator_id', onDelete: 'SET NULL' });  //optional association



sequelize.sync();
module.exports = sequelize;