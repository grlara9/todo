var express = require("express");
var exphbs = require("express-handlebars");
var mysql = require("mysql");
require('dotenv').config()


var app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 8080;

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var connection = mysql.createConnection({
    host     : "localhost",
    user     : "root",
    password : process.env.MYSQL_PASS,
    database : "todoDB"
  });
   
  connection.connect(function(err) {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }
  
    console.log("connected as id " + connection.threadId);
  });

  app.get("/", function(request, response){
    var query = "SELECT * FROM todos";
    connection.query(query, function(err, result){
        if(err) throw err;
        console.log(result);
        response.render("index", {dat: result})
    })
})
app.post("/api/add-todo", function(request, response){
    var query = "INSERT INTO todos (todo) VALUES (?)";
    connection.query(query, [request.body.todo], function(err, result){
        if(err) throw err;
        response.json({ id: result.insertId });
        console.log(result.insertId);
    })
})

app.listen(PORT, function(){
    console.log("Listening on PORT: " + PORT);
});

