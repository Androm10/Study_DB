const sequelize = require('../database');
const buildError = require('../utils/buildError');

module.exports = resultRepos = {
    
    getById : async function(resultId) {

        let result = sequelize.models.results.findByPk(resultId);

        return result;

    },

    addResult : async function(eventId, instance) {

        let event = await sequelize.models.events.findByPk(eventId)

        if(!event)  
            throw(buildError(400, 'No such event'));

        return await event.createResult(instance);   

    },

    getAllResults : async function(eventId) {

        let event = await sequelize.models.events.findByPk(eventId)

        if(!event)
            throw(buildError(400, 'no such event'));
    
        return event.getResults()
    
    },

    deleteResult :  async function(resultId) {

        let result = await sequelize.models.results.findByPk(resultId)

        if(!result)  
            throw(buildError(400, 'No such event'));

        result.destroy() 
  
        return resultId;

    },

    getAssociatedEvent : async function(resultId) {
    
        let result = await sequelize.models.results.findByPk(resultId)

        if(!result)  
            throw(buildError(400, 'No such event'));

        return result.getEvent()

    },

    selectWinningResult : async function(eventId, resultId) {

        await sequelize.models.results.update( 
            { isWinner: false },
            { where : {
                eventId : eventId
                }
            }
        );
    
        let result = await sequelize.models.results.findOne(
            { where : {
                id : resultId
                }
            }
        );

        await result.update({ isWinner : "true"});
    
        return result;

    },

    getAllBets : async function(resultId) {

        return await sequelize.models.bets.findAll({
            where : {
                resultId : resultId
                }
            }
        );
    
    }

}