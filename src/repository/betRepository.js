const sequelize = require('../database/database');
const buildError = require('../utils/buildError');

module.exports = betRepos = {
    addBet : async function(instance)  {

        let bet = await sequelize.models.bets.create(instance)

        return bet;

    }
    


  

}