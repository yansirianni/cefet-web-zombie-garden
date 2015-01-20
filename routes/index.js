var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET home page. */
router.get('/', function(req, res, next) {
  db.query('SELECT id, name ' +
           'FROM person ' +
           'WHERE alive = true',
    function(err, alivePeople) {
      if (err) res.status(500).send('Erro ao recuperar pessoas.');

      db.query('SELECT id, name ' +
               'FROM zombie ',
        function(err, zombies) {
            if (err) res.status(500).send('Erro ao recuperar zumbis. Eles nao podem ser recuperados. Brains.');

            res.render('index', {
              zombies: zombies,
              people: alivePeople,
              success: req.flash('success'),
              error: req.flash('error'),
            });
        });
    });
});

module.exports = router;
