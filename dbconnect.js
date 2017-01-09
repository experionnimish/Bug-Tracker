var mysql = require('mysql');

var sequelize = new Sequelize('bug_tracker', 'root', 'ndm0150040', {

  host: 'localhost',
  dialect: 'mysql'|'mariadb'|'sqlite'|'postgres'|'mssql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }

});

function handle_database(dbquery) {

    pool.getConnection(function(err,connection){
        if (err) {
          res.json({"code" : 100, "status" : "Error in database connection!"});
          return;
        }

        connection.query(dbquery,function(err,rows){
            connection.release();
            if(!err) {
                res.json(rows);
            }
        });

        connection.on('error', function(err) {
              res.json({"code" : 100, "status" : "Error in database connection!"});
              return;
        });
  });
}
