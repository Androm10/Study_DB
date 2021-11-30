const sequelize = require('../database/database');
const buildError = require('../utils/buildError');

module.exports = eventRepos = {

   addEvent : async function(instance){

      let event = sequelize.models.events.create(instance)
      .catch((error) => {            
        throw(error);
      });

    return event;
  },

  deleteEvent : async function(eventId){

    let event = await this.getEventById(eventId);

    if(!event) { 
      throw(buildError(404, 'No such event'));
      return;
    }
    
    event.destroy()
    .catch( (error) => {
      throw(buildError(500, error));
    });

    return eventId;   
  },

  getAllEvents : async function(){

  	return await sequelize.models.events.findAll()
    .catch( (error) => {
    	throw(buildError(500, error));
  	});

  },

  getActiveEvents : async function(){

    return await sequelize.models.events.findAll({ where : { is_active : true }})
    .catch( (error) => {
      throw(buildError(500, error));
    });

  },

  getCompletedEvents : async function(){

    return await sequelize.models.events.findAll({where: { is_active : false }})
    .catch( (error) => {
      throw(buildError(500, error));      
    })

  },

  getEventById : async function(eventId){

    return await sequelize.models.events.findByPk(eventId)
    .catch( (error) => {
      throw(buildError(500, error)); 
    })
    
  },

  setEventCompleted : async function(eventId) {

    return await sequelize.models.events.update( 
      { isActive: false },
      { where : {
        id : eventId
        }
      })
    .catch( (error) => {
      throw(500, error);
    });
    
  },

  

}