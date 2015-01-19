var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET lista de zumbis. */
router.get('/', function(req, res, next) {

  db.query('SELECT * FROM zombie', function(err, rows) {
    res.format({
      html: function() {
        res.render('listZombies', { zombies: rows });
      },
      json: function() {
        res.json({ zombies: rows });
      }
    });
  });
});

/* GET detalhes de um zumbi. */
router.get('/:id', function(req, res) {
    db.query({
      sql: 'SELECT * ' +
           'FROM zombie ' +
           'LEFT OUTER JOIN zombie biter ' +
             'ON zombie.bittenBy = biter.id ' +
           'WHERE zombie.id = ' + db.escape(req.params.id),
      nestTables: true
    }, function(err, rows) {
        console.log('O zumbi: ' + rows);
        if (err) res.status(500).send('Erro desconhecido: ' + err);

        res.format({
          html: function() {
            if (rows.length > 0) {
              res.render('detailsZombie', { zombie: rows[0] });
            } else {
              res.status(404).send('Zumbi nao encontrado. Tente novamente de noite.');
            }
          },
          json: function() {
            if (rows.length > 0) {
              res.json({ zombie: rows[0] });
            } else {
              res.status(404).send({});
            }
          }
        });
    });
});


module.exports = router;
