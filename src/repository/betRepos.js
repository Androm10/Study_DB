const sequelize = require('../database/database');
const buildError = require('../utils/buildError');

module.exports = betRepos = {
    addBet : async function(instance)  {

        let bet = sequelize.models.bets.create(instance)
        .catch((error) => {            
            throw(error);
        });

        return bet;

    }
    


  

}