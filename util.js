exports.getMySQLDate = function(date) {
  date = date.getUTCFullYear() + '-' +
    ('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
    ('00' + date.getUTCDate()).slice(-2) + ' ' +
    ('00' + date.getUTCHours()).slice(-2) + ':' +
    ('00' + date.getUTCMinutes()).slice(-2) + ':' +
    ('00' + date.getUTCSeconds()).slice(-2);
  return date;
};

exports.getReadableDateString = function(date) {
  return ('00' + date.getDate()).slice(-2) + '/' +
         ('00' + (date.getMonth()+1)).slice(-2) + '/' +
         date.getFullYear() + ' as ' +
         ('00' + date.getHours()).slice(-2) + ':' +
         ('00' + date.getMinutes()).slice(-2) + ':' +
         ('00' + date.getSeconds()).slice(-2);
}
