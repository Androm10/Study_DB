const express = require('express');
const eventService = require('../services/eventService');
const responseHandler = require('../utils/responseHandler');

let eventController = {

  addEvent :   function(req, res){
    console.log("server: starting add event operation");
       
    let event = {
      name : req.body.name,
      info : req.body.info ?? '',
      creatorId : req.body.creatorId,
      createAt : new Date(),
      deletedAt : req.body.deletedAt,
      isActive : req.body.isActive ?? true
    }
    
     eventService.addEvent(event)
     .then( (event) => {
      responseHandler.sendSuccess(res, event, 201);  
    })
    .catch( (error) => {
      console.log('server: unhandled error:\n ' + error);
      responseHandler.sendError(res, error);
    })

},

  deleteEvent : function(req, res) {
    console.log("server: starting delete event operation");
    let eventId = req.params.id;
    
    eventService.deleteEvent(eventId)
    .then( (eventId) => {
      responseHandler.sendSuccess(res, eventId, 200);
    })
    .catch( (error) => {
      responseHandler.sendError(res, error);
    })

  },

  getAllEvents : function(req, res) {
    console.log("server: starting show all events operation");

    eventService.getAllEvents()
    .then( (events) => {
      responseHandler.sendSuccess(res, events, 200);
    })
    .catch( (error) => {
      responseHandler.sendError(res, error);
    });
    
  },

  getActiveEvents : function(req, res) {
    console.log("server: starting show all active events operation");

    eventService.getActiveEvents()
    .then( (events) => {
      if(events)
        responseHandler.sendSuccess(res, events, 200);
      else
        responseHandler.sendSuccess(res, events, 204); //if events is empty
    })
    .catch( (error) => {
      responseHandler.sendError(res, error);
    });
  },

  getCompletedEvents : function(req, res) {
    console.log("server: starting show all completedEvents");

    eventService.getCompletedEvents()
    .then( (events) => {
      if(events)
        responseHandler.sendSuccess(res, events, 200);
      else
        responseHandler.sendSuccess(res, events, 204); //if events is empty
    })
    .catch( (error) => {
      responseHandler.sendError(res, error);
    })
  }

};
module.exports = eventController;