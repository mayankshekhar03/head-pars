// server.js
// where your node app starts

// init project
var express = require('express');
var ua = require('ua-parser-js');

var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  //response.sendFile(__dirname + '/views/index.html');
  var soft = ua(request.get('user-agent'));
  var ip = request.headers['x-forwarded-for'] ||
     request.connection.remoteAddress ||
     request.socket.remoteAddress ||
     request.connection.socket.remoteAddress;
  var lang = request.get('accept-language');
  var userObject = {
  "ip-address": ip,
  "language": lang.split(',')[0],
  "OS": soft.os.name + " " + soft.os.version
  }
  response.send(userObject);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
