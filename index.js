var http = require('http');
var fs = require('fs');
var extract = require('./extract');
var wss = require('./websockets-server');
var mime = require('mime');

var handleError = function (err, res) {
  file = '/error.html';
  var fp = extract(file);
  fs.readFile(fp, function (err, data){
      res.end(data);
  });
}

var server = http.createServer(function (req, res) {
  console.log('Responding to a request.');

  var filePath = extract(req.url);
  fs.readFile(filePath, function (err, data) {
    if (err) {
        handleError(err, res);
        return;
      } else {
        var type = mime.getType(filePath);
        res.setHeader('Content-Type', 'text/html');
    res.end(data);}
  });
});
server.listen(3000);