var mysql = require('mysql');

var express = require ('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

var moment = require('moment');

var connection = mysql.createConnection({
    host    :   'localhost',
    user    :   'Justin',
    password:   'Hyojon97',
    database:   'People'
});

connection.connect();

console.log("created SQL connection)");

app.use(express.static(path.join(__dirname,'public')));

app.use(bodyParser.urlencoded({extended: true}));

app.use(function (req,res,next){
    console.log(`moment().format('h:mm:ss a'): ${req.method}`);
    next();
});

app.get('/users',function(req,res){
    var query = connection.query('select username from users',function(err,rows,fields){
      res.send(JSON.stringify(rows));  
    });

});
 
app.post('/signup', function(req,res){
    res.send("Thanks for singing up!");
    console.log(`\nUsername : ${req.body.username}`);
    console.log(`Password : ${req.body.password}\n`);
    addUser(req.body.username,req.body.password);
});

app.listen(3000,function(){
    console.log("App listening on port 3000!");
});

function addUser(username,password){
    var user = {
        username: `${username}`,
        password: `${password}`
    };
    var query = connection.query('insert into users set ?', user,function(err,result){
       if(err){
           console.error(err);
           return;
       } 
        console.error(result);
    });
}

function showUser(){
    var query = connection.query('select username from users',function(err,result){
       if(err){
           console.error(err);
           return;
       } 
        return result;
    });
}