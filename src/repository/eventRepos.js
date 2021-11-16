const sequelize = require('../database/database');
const buildError = require('../utils/buildError');

module.exports = EventRepos = {
   addEvent : async function(instance){
      let obj = sequelize.models.events.create(instance)
      .catch((e) => {            
          throw(e);
      }); 
    return obj;
  },

  deleteEvent : async function(eventId){
    let event = await sequelize.models.events.findByPk(eventId)
    .catch( (error) => {
      throw(buildError(500, error));
    })
    if(!event) { 
      throw(buildError(404, 'No such event'));
      return;
    }
    event.destroy();
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
  }



}