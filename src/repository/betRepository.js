const sequelize = require('../database/database');
const buildError = require('../utils/buildError');

module.exports = betRepos = {
    
    getById : async function(betId) {

        let bet = sequelize.models.bets.findByPk(betId);

        if(!bet)
            throw(buildError(400, 'no such bet'));

        return bet;
        
    },

    addBet : async function(instance)  {

        let bet = await sequelize.models.bets.create(instance);

        return bet;

    },
    
    deleteBet : async function(betId) {

        let bet = await sequelize.models.bets.findByPk(betId);    
        let user = await bet.getUser();
        let wallet = await user.getWallet();

        let sum = Number(wallet.money) + Number(bet.money);

        wallet.update({money : sum});

        return bet;

    }

  

}