const express = require('express');
const sequelize = require('../models/sequelize_db');
//const sequelize = require('../models/sequelize_db');
const { validationResult } = require('../validators/eventValidator');

let eventAddController = (req, res) => {

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
        creator_id : req.body.creator_id,
        create_at : new Date(),
        deleted_at : req.body.deleted_at,
        is_active : req.body.is_active ?? true
      }
      try {
        sequelize.models.events.create(event);
      } catch(e) {
          console.log('server: unhandled error:\n ' + e);
          res.status(500).json(e);
      }

      res.status(201).json(event);
};

module.exports = eventAddController;