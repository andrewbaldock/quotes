var express = require('express');
// var cors = require('cors');
var app = express();
var http = require('http');
var httpServer = http.Server(app);



// app.use(cors());
app.use(express.static(__dirname+'/src'));



// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.header('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Content-Type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    // res.header('Access-Control-Allow-Credentials', false);

    // Pass to next layer of middleware
    next();
});


app.get('/', function(req, res){
    res.sendfile(__dirname + '/index.html');
});
app.listen(3000, function() {
  console.log('listening');
});
