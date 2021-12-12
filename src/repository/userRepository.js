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

    getAllUsers : async function() {

        return await sequelize.models.users.findAll();

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

    deleteAccount : async function(userId) {

        let user = await sequelize.models.users.findByPk(userId);
        let userInfo = await user.getInformation();
        let wallet = await user.getWallet();

        await wallet.destroy();  
        await userInfo.destroy();
        await user.destroy();

        return user;
    },    

}