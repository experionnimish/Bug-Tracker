var express = require("express");
var mysql = require('mysql');
var bodyparser = require("body-parser");
var app       =    express();

app.use(bodyparser.urlencoded({

	extended : "true"

}));

var pool      =    mysql.createPool({
    connectionLimit : 100,
    host     : 'localhost',
    user     : 'root',
    password : 'ndm0150040',
    database : 'college',
    debug    :  false
});

function handle_database(req,res) {
    
	var db = req.params.db;

	var dbquery = "SELECT * FROM "+ db;

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

app.get("/:db",function(req,res){
        handle_database(req,res);
});
	
app.listen(3000);