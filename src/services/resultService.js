const express = require('express');
const result = require('../repository/resultRepos');
const event = require('../repository/eventRepos');
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
        if(!ev)
            throw(buildError(400, 'No Such event'));
        
        if(JSON.stringify(ev) !== JSON.stringify(associatedEvent))
            throw(buildError(400, 'Event does not have requested result'));
        
        event.setEventCompleted(id);
        let res = result.selectWinningResult(id, resultId);   
        return res;
    }
    
}