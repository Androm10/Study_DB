const express = require('express');
const eventRepository = require('../repository/eventRepository');
const fs = require("fs");
const buildError = require('../utils/buildError');


module.exports = eventService = {

    addEvent : async function(instance) {

        return eventRepository.addEvent(instance);
    },

    uploadImage : async function(id, path) {

        let event = await eventRepository.getEventById(id);

        if(!event)
            throw(buildError(400, 'No such event'));

        await event.update({image: path});

        return event;
    },

    deleteEvent : async function(id) {

        return eventRepository.deleteEvent(id);
    },

    deleteImage : async function(id) {

        let event = await eventRepository.getEventById(id);

        if(!event)
            throw(buildError(400, 'No such event'));

        let pathToImage = event.image;

        fs.unlinkSync(pathToImage);

        await event.update({image: null});

        return event;
    },

    getAllEvents : async function(limit, offset) {

        throw(buildError(500, 'test'));
        return eventRepository.getAllEvents(limit, offset);
    },

    getActiveEvents : async function(limit, offset) {

        return eventRepository.getActiveEvents(limit, offset);
    },
    
    getCompletedEvents : async function(limit, offset){
        
        return eventRepository.getCompletedEvents(limit, offset);
    },

    mostLosses : async function() {
        
        return eventRepository.mostLosses();
    },

    

}