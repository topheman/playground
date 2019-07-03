/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , fs = require('fs')
  , path = require('path');

var PORT = process.env.PORT || 3000;
var app = express();

// all environments
app.configure(function(){
    app.set('views', __dirname + '/app/views');
    app.set('view engine', 'ejs');
    app.use(express.favicon( __dirname + '/app/public/src/favicon.ico'));
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    app.use(express.session({secret: 'secret', key: 'express.sid'}));
    app.use(app.router);
    app.use(express.static(path.join(__dirname,'app','public','src')));
});

// development only
app.configure('development', function(){
  app.use(express.errorHandler());
});

//declare routes
fs.readdir('./app/routes', function(err, files){
    files.forEach(function(fn) {
        if(!/\.js$/.test(fn)) return;
        require('./app/routes/' + fn)(app);
    });
});

var server = http.createServer(app).listen(PORT, function(){
  var address = 'http://' + (process.env.NODE_ENV === "development" ? require('my-local-ip')() : "localhost") + ":" + PORT;
  console.log('Server started on ' + address);
  if(process.env.NODE_ENV === "development" && !process.env.FORWARDED) {
    console.log('In development mode, you will need https for accelerometer - use: `npm run dev:https`\n')
  }
});
var io = require('socket.io').listen(server, {log: false});

require('./app/logic/playground.io').init(io);