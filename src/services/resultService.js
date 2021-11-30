const express = require('express');
const result = require('../repository/resultRepository');
const event = require('../repository/eventRepository');
const buildError = require('../utils/buildError');

module.exports = resultService = {

    addResult : async function(eventId, instance) {

        return result.addResult(eventId, instance);
    },

    getAllResults : async function(eventId) {

        return result.getAllResults(eventId);
    },

    deleteResult : async function(resultId) {

        return result.deleteResult(resultId);
    },

    selectWinningResult : async function(id, resultId) {

        let ev = await event.getEventById(id);
        let associatedEvent = await result.getAssociatedEvent(resultId);
        //if event does'nt exists - throw an error
        if(!ev)
            throw(buildError(400, 'No Such event'));
        
        //if event does'nt matches the event associated to result - throw an error
        if(JSON.stringify(ev) !== JSON.stringify(associatedEvent))
            throw(buildError(400, 'Event does not have requested result'));
        
        event.setEventCompleted(id);
        let res = result.selectWinningResult(id, resultId);   
        return res;
    }
    
}