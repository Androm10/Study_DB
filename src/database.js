const sequelize = require("./models/sequelizeDB");

const user         = require("./models/user");
const userInfo     = require("./models/userInfo");
const wallet       = require("./models/wallet");
const operation    = require("./models/operation");
const role         = require("./models/role");
const usersRoles   = require("./models/usersRoles");
const bet          = require("./models/bet");
const result       = require("./models/result");
const event        = require("./models/event");
    


user.hasOne( userInfo, { foreignKey: 'userId', as: 'information' });
userInfo.belongsTo( user, { foreignKey: 'userId', as: 'user' });

user.hasOne( wallet, { foreignKey: 'userId', as: 'wallet' });
wallet.belongsTo( user, { foreignKey: 'userId', as : 'user' });

user.belongsToMany( role, { through: 'users_roles', foreignKey: 'userId', otherKey: 'roleId', as: 'roles' });
role.belongsToMany( user, { through: 'users_roles', foreignKey: 'roleId', otherKey: 'userId', as: 'users' });

user.hasMany( bet, { foreignKey: 'userId', as: 'bets' });
bet.belongsTo( user, { foreignKey: 'userId', as: 'user' });

wallet.hasMany( operation, { foreignKey: 'walletId', as: 'operations' });
operation.belongsTo( wallet, { foreignKey: 'walletId', as: 'wallet' });

result.hasMany( bet, { foreignKey: 'resultId', as: 'onResult' });
bet.belongsTo( result, { foreignKey: 'resultId', as: 'result' });

event.hasMany( result, { foreignKey: 'eventId', as: 'results' });
result.belongsTo( event, { foreignKey: 'eventId', as: 'event' });

event.belongsTo( user, { foreignKey: 'creatorId', onDelete: 'SET NULL', as: 'creator' });  //optional association
user.hasMany( event, { foreignKey: 'creatorId', as: 'createdEvents', onDelete: 'SET NULL' });


sequelize.sync();

module.exports = sequelize;