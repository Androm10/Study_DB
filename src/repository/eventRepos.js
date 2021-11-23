const sequelize = require('../database/database');
const buildError = require('../utils/buildError');

module.exports = eventRepos = {

   addEvent : async function(instance){

      let obj = sequelize.models.events.create(instance)
      .catch((error) => {            
        throw(error);
      });

    return obj;
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

  getEventById : async function(id){

    return await sequelize.models.events.findByPk(id)
    .catch( (error) => {
      throw(buildError(500, error)); 
    })
    
  },

  setEventCompleted : async function(id) {

    return await sequelize.models.events.update( 
      { isActive: false },
      { where : {
        id : id
        }
      })
    .catch( (error) => {
      throw(500, error);
    });
    
  },

  

}