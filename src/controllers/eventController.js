const express = require('express');
const eventService = require('../services/eventService');
const responseHandler = require('../utils/responseHandler');

let eventController = {

    addEvent : async function(req, res, next){

        let event = {
            name : req.body.name,
            info : req.body.info ?? '',
            creatorId : req.user.id,
            createAt : new Date(),
            deletedAt : req.body.deletedAt,
            isActive : req.body.isActive ?? true
        }
        try {
            let result = await eventService.addEvent(event);
            responseHandler.sendSuccess(res, result, 201);
        }
        catch(error) {
           next(error);
        }

    },

    deleteEvent : async function(req, res, next) {

        try {
            let eventId = await eventService.deleteEvent(req.params.id);
            responseHandler.sendSuccess(res, eventId, 200);
        }
        catch(error) {
            next(error);
        }

    },

    getAllEvents : async function(req, res, next) {

        try {
            let events = await eventService.getAllEvents(req.query.limit, req.skip);

            let instanceCount = events.count;
            let pageCount = Math.ceil(instanceCount / req.query.limit);

            let response = {
                events : events.rows,
                count : instanceCount,
                pages : pageCount,
                current : req.query.page
            }

            responseHandler.sendSuccess(res, response, 200); 
        }
        catch(error) {
            next(error);
        }
    
    },

    getActiveEvents : async function(req, res, next) {

        try {
            let events = await eventService.getActiveEvents(req.query.limit, req.skip);

            let instanceCount = events.count;
            let pageCount = Math.ceil(instanceCount / req.query.limit);

            let response = {
                events : events.rows,
                count : instanceCount,
                pages : pageCount,
                current : req.query.page
            }

            responseHandler.sendSuccess(res, response, 200);
        }
        catch(error) {
            next(error);
        }

    },

    getCompletedEvents : async function(req, res, next) {

       try {
            let events = await eventService.getCompletedEvents(req.query.limit, req.skip);

            let instanceCount = events.count;
            let pageCount = Math.ceil(instanceCount / req.query.limit);

            let response = {
                events : events.rows,
                count : instanceCount,
                pages : pageCount,
                current : req.query.page
            }

            responseHandler.sendSuccess(res, response, 200);
       }
        catch(error) {
            next(error);
        }
    }

};
module.exports = eventController;