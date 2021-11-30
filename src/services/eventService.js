const express = require('express');
const event = require('../repository/eventRepository');

module.exports = eventService = {

     addEvent : async function(instance) {

        return event.addEvent(instance);
    },

    deleteEvent : async function(id) {

        return event.deleteEvent(id);
    },

    getAllEvents : async function() {

        return event.getAllEvents();
    },

    getActiveEvents : async function() {

        return event.getActiveEvents();
    },
    
    getCompletedEvents : async function(){
        
        return event.getCompletedEvents();
    }
    
}