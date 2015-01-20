var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET home page. */
router.get('/', function(req, res, next) {
  db.query('SELECT id, name, alive ' +
           'FROM person',
    function(err, people) {
      if (err) res.status(500).send('Erro ao recuperar pessoas.');

      db.query('SELECT id, name, pictureUrl ' +
               'FROM zombie ',
        function(err, zombies) {
            if (err) res.status(500).send('Erro ao recuperar zumbis. Eles nao podem ser recuperados. Brains.');

            res.render('index', {
              zombies: zombies,
              people: people,
              success: req.flash('success'),
              error: req.flash('error'),
              peopleCountChange: req.flash('peopleCountChange'),
              zombieCountChange: req.flash('zombieCountChange')
            });
        });
    });
});

module.exports = router;
