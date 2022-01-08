const { QueryTypes } = require('sequelize');
const sequelize = require('../database');
const buildError = require('../utils/buildError');
const fs = require('fs');

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

        const t = await sequelize.transaction();
        try {
            let event = await sequelize.models.events.findByPk(eventId);

            if(!event) 
                throw(buildError(404, 'No such event'));

            if(event.image) {
                let pathToImage = event.image;
                fs.unlinkSync(pathToImage);
            }

            await event.destroy({transaction : t});

            await t.commit();  
        }
        catch (error) {
            await t.rollback();
            throw(error);
        }
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

    mostLosses : async function() {
        return await sequelize.query( 'SELECT e.name, SUM(b.money) as losts' +
		' FROM events e' +
        ' LEFT JOIN results r' +
        ' ON r.event_id = e.id' +
		' JOIN bets b' +
        ' ON r.id = b.result_id' +
		' WHERE e.is_active = false' +
        ' AND r.is_winner = false' +
        ' ORDER BY losts DESC' +
        ' LIMIT 1' 
        , 
        {
            type: QueryTypes.SELECT
        });
    }


}