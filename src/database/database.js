const sequelize = require("../models/sequelizeDB");

const users         = require("../models/usersModel");
const userInfo      = require("../models/userInfoModel");
const wallets       = require("../models/walletsModel");
const operations    = require("../models/operationsModel");
const roles         = require("../models/rolesModel");
const usersRoles    = require("../models/usersRolesModel");
const bets          = require("../models/betsModel");
const results       = require("../models/resultsModel");
const events        = require("../models/eventsModel");
    


users.hasOne( userInfo, { foreignKey: 'userId', as: 'information' });
userInfo.belongsTo( users, { foreignKey: 'userId', as: 'user' });

users.hasOne( wallets, { foreignKey: 'userId', as: 'wallet' });
wallets.belongsTo( users, { foreignKey: 'userId', as : 'user' });

users.belongsToMany( roles, { through: 'users_roles', foreignKey: 'userId', otherKey: 'roleId', as: 'roles' });
roles.belongsToMany( users, { through: 'users_roles', foreignKey: 'roleId', otherKey: 'userId', as: 'users' });

users.hasMany( bets, { foreignKey: 'userId', as: 'bets' });
bets.belongsTo( users, { foreignKey: 'userId', as: 'user' });

wallets.hasMany( operations, { foreignKey: 'walletId', as: 'operations' });
operations.belongsTo( wallets, { foreignKey: 'walletId', as: 'wallet' });

results.hasMany( bets, { foreignKey: 'resultId', as: 'onResult' });
bets.belongsTo( results, { foreignKey: 'resultId', as: 'result' });

events.hasMany( results, { foreignKey: 'eventId', as: 'results' });
results.belongsTo( events, { foreignKey: 'eventId', as: 'event' });

events.belongsTo( users, { foreignKey: 'creatorId', onDelete: 'SET NULL', as: 'creator' });  //optional association
users.hasMany( events, { foreignKey: 'creatorId', as: 'createdEvents', onDelete: 'SET NULL' });


sequelize.sync();

module.exports = sequelize;