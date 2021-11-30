const sequelize = require('../database/database');
const buildError = require('../utils/buildError');

module.exports = eventRepos = {

   addEvent : async function(instance){

      let event = await sequelize.models.events.create(instance)

    return event;
  },

  deleteEvent : async function(eventId){

    let event = await this.getEventById(eventId);

    if(!event) { 
      throw(buildError(404, 'No such event'));
      return;
    }
    
    event.destroy()

    return eventId;   
  },

  getAllEvents : async function(){

  	return await sequelize.models.events.findAll()

  },

  getActiveEvents : async function(){

    return await sequelize.models.events.findAll(
      { where : 
        { is_active : true }
      });

  },

  getCompletedEvents : async function(){

    return await sequelize.models.events.findAll(
      { where: { is_active : false }
    });

  },

  getEventById : async function(eventId){

    return await sequelize.models.events.findByPk(eventId)
    
  },

  setEventCompleted : async function(eventId) {

    return await sequelize.models.events.update( 
      { isActive: false },
      { where : {
        id : eventId
        }
      });
    
  },

  

}