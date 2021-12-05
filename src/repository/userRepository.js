const sequelize = require('../database/database');
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
            });

    },

    getByUsername : async function(username) {

        let userInfo =  await sequelize.models.user_info.findOne(
            { where : { 
                username : username
                }
            });
        
        if(!userInfo)
            return null;


        return userInfo.getUser();
    },

    addUser : async function(instance, username) {
        let hashedPassword = await crypt.cryptPassword(instance.password);
        instance.password = hashedPassword;

        let user = await sequelize.models.users.create(instance);

        user.createInformation( {username : username } );
        user.createWallet();

        return user;
    }
    

}