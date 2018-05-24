const express = require('express');
const router = express.Router();
const db = require('../db');

/* GET página inicial */
router.get('/', (req, res, next) => {
  // pega todas as pessoas do banco de dados
  db.query('SELECT id, name, alive ' +
           'FROM person',
    (err, people) => {
      if (err) {
        res.status(500).send('Erro ao recuperar pessoas.');
      }

      // pega todos os zumbis
      db.query('SELECT id, name, pictureUrl ' +
               'FROM zombie ',
        (err, zombies) => {
            if (err) {
              res.status(500).send('Erro ao recuperar zumbis. Eles nao podem ser recuperados. Brains.');
            }

            // renderiza a view index
            res.render('index', {
              zombies: zombies,
              people: people,

              // req.flash é uma forma de comunicar algo efêmero à view
              // (tipo uma mensagem de sucesso/erro após uma operação)...
              // o método .flash é injetado em req graças ao pacote
              // connect-flash (veja o package.json)
              success: req.flash('success'),
              error: req.flash('error'),
              peopleCountChange: req.flash('peopleCountChange'),
              zombieCountChange: req.flash('zombieCountChange')
            });
        });
    });
});

module.exports = router;
