var mysql = require('mysql');
var Sequelize = require('sequelize');

var sequelize = new Sequelize('bug_tracker', 'root', 'ndm0150040', {

  host: 'localhost',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }



});

module.exports = sequelize;
