const express = require('express');
const event = require('../repository/eventRepos');

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
    }
}