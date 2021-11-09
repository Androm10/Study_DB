const express = require('express');
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
}
};
module.exports = eventController;