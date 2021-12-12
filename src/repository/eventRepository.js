const sequelize = require('../database');
const buildError = require('../utils/buildError');

module.exports = eventRepos = {

    getEventById : async function(eventId){

        return await sequelize.models.events.findByPk(eventId)
    
    },

    getAllEvents : async function(limit, offset) {

  	    return await sequelize.models.events.findAndCountAll(
            { limit: limit,
            offset: offset 
           });

    },

    getActiveEvents : async function(limit, offset){

        return await sequelize.models.events.findAndCountAll(
            { limit: limit,
            offset: offset,    
            where : { 
                is_active : true 
                }
            });

    },

    getCompletedEvents : async function(limit, offset){

        return await sequelize.models.events.findAndCountAll(
            { limit: limit,
            offset: offset, 
            where: { 
                is_active : false 
                }
            });

    },
    
    addEvent : async function(instance){

        let event = await sequelize.models.events.create(instance)

        return event;

    },

    deleteEvent : async function(eventId){

        let event = await this.getEventById(eventId);

        if(!event) 
            throw(buildError(404, 'No such event'));

        event.destroy()

        return eventId;   
        
    },

    setEventCompleted : async function(eventId) {

        return await sequelize.models.events.update( 
            { isActive: false },
            { where : {
                id : eventId
                }
            }
        );
    
    },

  

}