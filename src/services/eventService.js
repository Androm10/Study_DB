const express = require('express');
const eventRepository = require('../repository/eventRepository');

module.exports = eventService = {

     addEvent : async function(instance) {

        return eventRepository.addEvent(instance);
    },

    deleteEvent : async function(id) {

        return eventRepository.deleteEvent(id);
    },

    getAllEvents : async function() {

        return eventRepository.getAllEvents();
    },

    getActiveEvents : async function() {

        return eventRepository.getActiveEvents();
    },
    
    getCompletedEvents : async function(){
        
        return eventRepository.getCompletedEvents();
    }
    
}