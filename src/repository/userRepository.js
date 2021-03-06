const { QueryTypes, Op } = require('sequelize');
const sequelize = require('../database');
const buildError = require('../utils/buildError');
const crypt = require('../utils/crypt');

module.exports = userRepository = {
    
    getById : async function(userId) {

        let user = await sequelize.models.users.findByPk(userId);

        if(!user)
            throw(buildError(400, 'No such user'));

        return user;

    },

    getByLogin : async function(login) {

        return await sequelize.models.users.findOne(
            { where : { 
                login : login
                }
            }
        );

    },

    getByUsername : async function(username) {

        let userInfo =  await sequelize.models.user_info.findOne(
            { where : { 
                username : username
                }
            }
        );
        
        if(!userInfo)
            return null;

        return userInfo.getUser();
    },

    getAllUsers : async function(limit, offset, filter) {
        
        let where = {
            [Op.or] : [
                {first_name : {
                    [Op.like] : `${filter.firstName}%`
                } },
                {last_name : {
                    [Op.like] : `${filter.lastName}%`
                } }
            ]
        }

        if(!filter.firstName && !filter.lastName)
            where = {};

        let res = await sequelize.models.user_info.findAndCountAll(
            { limit: limit,
            offset: offset,
            where : where              
            }
        );

        let users = [];
     
        for(let info of res.rows) {
            users.push(await info.getUser());
        }
        
        res.rows = users;

        return res;

    },

    getAllDevs : async function() {

        let role = await sequelize.models.roles.findOne({where : {name : "Dev"}});
     
        let devs = await role.getUsers();
        
        return devs;
    },

    addUser : async function(instance, username) {

        let hashedPassword = await crypt.cryptPassword(instance.password);
        instance.password = hashedPassword;

        let user = await sequelize.models.users.create(instance);

        user.createInformation( {username : username } );
        user.createWallet();
        let userRole = await sequelize.models.roles.findOne(
            { where: {
                name : "User"
                } 
            }
        );

        user.addRole(userRole);

        return user;
    },

    changePassword : async function(userId, password) {

        let hashedPassword = await crypt.cryptPassword(password);
        
        let user = await sequelize.models.users.findByPk(userId);

        return await user.update({ password : hashedPassword});
    },

    deleteAccount : async function(userId) {

        let user = await sequelize.models.users.findByPk(userId);
        let userInfo = await user.getInformation();
        let wallet = await user.getWallet();

        await wallet.destroy();  
        await userInfo.destroy();
        await user.destroy();

        return user;
    },

    getLastBet : async function(userId) {

        let bet = await sequelize.models.bets.findOne({
            order : [
                ['create_at', 'DESC']
            ]
        });

        return bet;
    },

    mostPoints : async function(date) {
        let year = (new Date(date)).getFullYear();
        let month = (new Date(date)).getMonth() + 1;

        let user = await sequelize.query(
        'SELECT u.login, u_i.username, SUM(b.money) as points' +
        ' FROM users u' + 
        ' JOIN user_info u_i ' + 
        ' ON u.id = u_i.user_id' + 
        ' JOIN bets b' + 
        ' ON b.user_id = u.id' + 
        ' JOIN results r' + 
        ' ON r.id = b.result_id' +
        ' WHERE r.is_winner = true' + 
        ' GROUP BY b.create_at HAVING MONTH(b.create_at) = ?' +
        ' AND YEAR(b.create_at) = ?' +
        ' ORDER BY points DESC' + 
        ' LIMIT 1', 
        {
            replacements: [month, year],
            type : QueryTypes.SELECT
        });

        return user;
    }

}