var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var methodOverride = require('method-override')
var flash = require('connect-flash');
var db = require('./db');

var routes = require('./routes/index');
var people = require('./routes/people');
var zombies = require('./routes/zombies');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// override with POST having ?_method=DELETE
app.use(methodOverride('_method', { methods: ['GET', 'POST'] }));
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('lalala'));
app.use(session({
  secret: 'lalala',
  resave: false,
  saveUninitialized: true
}));
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/people', people);
app.use('/zombies', zombies);
app.use('/db/reset', function(req, res) {

  var errorMessage = 'Nao foi possivel restaurar o banco. ';

  db.beginTransaction(function(err) {
    db.query('SET FOREIGN_KEY_CHECKS = 0; ', function(err, result) {
      db.query('TRUNCATE TABLE `zombies`.`person`;', function(err, result) {
        if (err) {
          db.rollback();
          req.flash('error', errorMessage);
          return;
        }

        db.query('TRUNCATE TABLE `zombies`.`zombie`;', function(err, result) {
          if (err) {
            db.rollback();
            req.flash('error', errorMessage);
            return;
          }


          db.query('SET FOREIGN_KEY_CHECKS = 1;', function(err, result) {
            var sqlText = "INSERT INTO `zombies`.`zombie` (`id`, `name`, `born`, `previousName`, `pictureUrl`, `bittenBy`) VALUES (NULL, 'Zeshua', '1971-01-01 00:00:00', 'desconhecido', 'zombie1.jpg', NULL); INSERT INTO `zombies`.`zombie` (`id`, `name`, `born`, `previousName`, `pictureUrl`, `bittenBy`) VALUES (NULL, 'Zileide', '1990-02-27 04:24:09', 'Gisleide Caetano', 'zombie2.jpg', 1);INSERT INTO `zombies`.`zombie` (`id`, `name`, `born`, `previousName`, `pictureUrl`, `bittenBy`) VALUES (NULL, 'Zaratustra', '1991-04-18 20:03:22', 'Sara Tustra', 'zombie3.jpg', 1); INSERT INTO `zombies`.`zombie` (`id`, `name`, `born`, `previousName`, `pictureUrl`, `bittenBy`) VALUES (NULL, 'Zinho', '1995-12-13 23:33:10', 'Jose Plinio', 'zombie4.jpg', 1); INSERT INTO `zombies`.`zombie` (`id`, `name`, `born`, `previousName`, `pictureUrl`, `bittenBy`) VALUES (NULL, 'Zelestor', '2001-11-09 05:23:19', 'Adamastor Pinheiro', 'zombie5.jpg', 3); INSERT INTO `zombies`.`zombie` (`id`, `name`, `born`, `previousName`, `pictureUrl`, `bittenBy`) VALUES (NULL, 'Zocrato', '2014-09-24 22:59:55', 'Socrates Sangalo', 'zombie6.jpg', 4);";
            db.query(sqlText, function(err, result) {
              if (err) {
                db.rollback();
                req.flash('error', errorMessage);
                return;
              }

              sqlText = "INSERT INTO `zombies`.`person` (`id`, `name`, `alive`, `eatenBy`) VALUES (NULL, 'Adalberto Silva', 1, NULL);  INSERT INTO `zombies`.`person` (`id`, `name`, `alive`, `eatenBy`) VALUES (NULL, 'Justiniano Ferreira', 1, NULL);  INSERT INTO `zombies`.`person` (`id`, `name`, `alive`, `eatenBy`) VALUES (NULL, 'Ariosvaldo Pereira', 1, NULL);  INSERT INTO `zombies`.`person` (`id`, `name`, `alive`, `eatenBy`) VALUES (NULL, 'Warley Damasceno', 0, 1);  INSERT INTO `zombies`.`person` (`id`, `name`, `alive`, `eatenBy`) VALUES (NULL, 'Arlete Prada', 1, NULL);  INSERT INTO `zombies`.`person` (`id`, `name`, `alive`, `eatenBy`) VALUES (NULL, 'Herminio Aleixo', 1, NULL);  INSERT INTO `zombies`.`person` (`id`, `name`, `alive`, `eatenBy`) VALUES (NULL, 'Osorio Oliveira', 0, 3);";
              db.query(sqlText, function(err, result) {
                if (err) {
                  db.rollback();
                  req.flash('error', errorMessage);
                  return;
                }

                db.commit(function(err) {
                  if (err) {
                    db.rollback();
                    req.flash('error', errorMessage);
                    return;
                  }
                  req.flash('success', 'Banco de dados restaurado ao estado original');
                  res.redirect('/');
                });
              });
            });
          });
        });
      });
    });
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
