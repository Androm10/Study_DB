const sequelize = require('../database/database');
const buildError = require('../utils/buildError');

module.exports = walletRepository = {
    addMoney : async function(userId, money)  {
        let user = await sequelize.models.users.findByPk(userId);

        if(!user)
            throw(buildError(400, 'No such user'));

        let wallet = await user.getWallet();

        let sum = Number(wallet.money) + Number(money);

        wallet.update({money : sum})
        
        return sum;

    }
    

}