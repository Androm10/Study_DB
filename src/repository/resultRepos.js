const sequelize = require('../database/database');
const buildError = require('../utils/buildError');

module.exports = resultRepos = {
   addResult : async function(eventId, instance) {
    let event = await sequelize.models.events.findByPk(eventId)
    .catch ( (error) => {             
      throw(buildError(500, error));   
    })

    if(!event)  
      throw(buildError(400, 'No such event'));

    return await event.createResult(instance)
    .catch( (error) => {
      throw(buildError(500, error));
    });      

  },

  getAllResults : async function(eventId) {

    let results = await sequelize.models.events.findByPk(eventId)
    .then( (event) => {

     return event.getResults()
      .catch( (error) => {      
        throw(buildError(500, error));      
      })
    
    })
    .catch( (error) => {

      throw(buildError(500, error));
   
    });

    return results;
  },

  deleteResult :  async function(resultId) {

    let result = await sequelize.models.results.findByPk(resultId)
    .catch( (error) => {             
      throw(buildError(500, error));   
    }); 

    if(!result)  
      throw(buildError(400, 'No such event'));

    result.destroy()
    .catch( (error) => {
      throw(buildError(500, error));
    });      
  
    return resultId;
  },

  getAssociatedEvent : async function(resultId) {
    
    let result = await sequelize.models.results.findByPk(resultId)
    .catch( (error) => {
      throw(buildError(500, error));
    });

    if(!result)  
      throw(buildError(400, 'No such event'));

    return result.getEvent()
    .catch( (error) => {
      throw(buildError(500, error));
    })

  },

  selectWinningResult : async function(eventId, resultId) {

    sequelize.models.results.update( 
      { isWinner: false },
      { where : {
        eventId : eventId
      }
    })
    .catch( (error) => {
      throw(500, error);
    });
    
   let result = await sequelize.models.results.update(
    { isWinner: true },
    { where : {
      id : resultId
      }
    })
    .catch( (error) => {
      throw(500, error);
    });
    
    return result;
  },

  getAllBets : async function(resultId) {

    return await sequelize.models.bets.findAll({
      where : {
        resultId : resultId
      }
    })
    .catch( (error) => {
      throw(buildError(500, error));
    })
    
  }

}