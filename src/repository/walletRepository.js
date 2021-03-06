const sequelize = require('../database');
const buildError = require('../utils/buildError');

module.exports = walletRepository = {
    
    getOperations : async function(userId, limit, offset) {
        let user = await sequelize.models.users.findByPk(userId);

        if(!user)
            throw(buildError(400, 'No such user'));

        let wallet = await user.getWallet();
        let operations = sequelize.models.operations.findAndCountAll(
            { limit: limit,
            offset: offset,
            where : {
                walletId : wallet.id
                } 
           });
        
        return operations;
    },

    addMoney : async function(userId, money) {

        let user = await sequelize.models.users.findByPk(userId);

        if(!user)
            throw(buildError(400, 'No such user'));

        let wallet = await user.getWallet();

        let sum = Number(wallet.money) + Number(money);

        await wallet.update({money : sum})
        
        return sum;

    },

    outputMoney : async function(userId, money) {
        let user = await sequelize.models.users.findByPk(userId);

        if(!user)
            throw(buildError(400, 'No such user'));

        let wallet = await user.getWallet();

        let sum = Number(wallet.money) - Number(money);

        if(+sum < 0)
            throw(buildError(400, 'cannot output more than wallet have'));

        await wallet.update({money : sum});

        return sum;
    },
    
}