const express = require('express');
const eventRepository = require('../repository/eventRepository');

module.exports = eventService = {

     addEvent : async function(instance) {

        return eventRepository.addEvent(instance);
    },

    deleteEvent : async function(id) {

        return eventRepository.deleteEvent(id);
    },

    getAllEvents : async function(limit, offset) {

        return eventRepository.getAllEvents(limit, offset);
    },

    getActiveEvents : async function(limit, offset) {

        return eventRepository.getActiveEvents(limit, offset);
    },
    
    getCompletedEvents : async function(limit, offset){
        
        return eventRepository.getCompletedEvents(limit, offset);
    }
    
}