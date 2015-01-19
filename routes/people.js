var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET lista de pessoas. */
router.get('/', function(req, res, next) {

  var list = db.query({
    sql: 'SELECT * FROM person LEFT OUTER JOIN zombie ON eatenBy = zombie.id',
    nestTables: true
    }, function(err, rows) {
      console.log(rows);

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




module.exports = router;
