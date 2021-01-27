const express = require('express');
const router = express.Router();
const knex = require('knex');
const enviroment = process.env.NODE_ENV || 'development';
const config = require("../knexfile")[enviroment];

router.get('/latest', (req, res) => {
  knex(config).migrate.latest()
    .then(data => {
      res.status(200).json({
        data
      });
      // knex(config).seed.run()
      //   .then(seeds => {
      //     res.status(200).json({
      //       data,
      //       seeds
      //     });
      //   })
      //   .catch(err => res.status(400).json(err));
    })
    .catch(err => res.status(400).json(err));

});
module.exports = router;