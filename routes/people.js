var express = require('express');
var db = require('../db');

var router = express.Router();

/* GET lista de pessoas. */
router.get('/', function(req, res, next) {

  db.query({
    sql: 'SELECT * FROM person LEFT OUTER JOIN zombie ON eatenBy = zombie.id',
    nestTables: true
    }, function(err, rows) {
      if (err) res.status(500).send('Problema ao recuperar pessoas.');

      res.format({
        html: function() {
          res.render('listPeople', { people: rows });
        },
        json: function() {
          res.json({ people: rows });
        }
      });
  });
});


/* PUT altera pessoa para morta por um certo zumbi */
router.put('/eaten/', function(req, res) {
  db.query('UPDATE person ' +
           'SET alive = false, eatenBy = ' + db.escape(req.body.zombie) + ' ' +
           'WHERE id = ' + db.escape(req.body.person),
    function(err, result) {
      req.flash('success', 'A pessoa foi inteiramente (nao apenas cerebro) engolida.');
      res.redirect('/');
  });
});


module.exports = router;
