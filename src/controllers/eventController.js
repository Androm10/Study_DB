const express = require('express');
const events = require('../models/eventsModel');
const sequelize = require('../models/sequelizeDB');
//const sequelize = require('../models/sequelize_db');
const { validationResult } = require('../validators/eventValidator');

let eventController = {

 addEvent :  function(req, res){

    console.log("server: starting add event operation");
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return  console.log('server: validation fails are: \n \' \n' + 
                errors.array() + '\n \''  
         );
      }
      
      let event = {
        name : req.body.name,
        info : req.body.info ?? '',
        creatorId : req.body.creatorId,
        createAt : new Date(),
        deletedAt : req.body.deletedAt,
        isActive : req.body.isActive ?? true
      }
      try {
        sequelize.models.events.create(event);
      } catch(e) {
          console.log('server: unhandled error:\n ' + e);
          res.status(500).json(e);
      }

      res.status(201).json(event);
},

  deleteEvent : function(req,res) {
    console.log("server: starting delete event operation");
    let eventId = req.body.id;

    let ev;

     sequelize.models.events.findByPk(eventId).then( (ev) => {
        if(!ev) { 
          res.status(404).json(ev);
          return;
        }
        ev.destroy();
        res.status(200).json(eventId);
      });
},

  getAllEvents : function(req, res) {
    console.log("server: starting show all events operation");
    sequelize.models.events.findAll().then( (evs) => {
      res.status(200).json(evs);  
    });

  }

};
module.exports = eventController;