var express = require('express');
var app = express();
var fs = require("fs");

let breakpoints = '';

// Add headers for Cross Origin Request
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

app.get('/get_description/:dir', function(req, res) {
   dir = req.params.dir;
   console.log('Querying direction: ' + dir);
   default_response = {'description': 'No description',
               'image': '',
               'movementAllowed': false}
   response = breakpoints
   for (ch of dir)
      response = response[ch] || default_response;

   res.end(JSON.stringify({
      'description': response['description'],
      'image': response['image'],
      'movementAllowed': response['movementAllowed']
   }));
})

app.get('/get_image/:image_name', function(req, res) {
   res.sendFile(__dirname + '/' + 'images/' + req.params.image_name);
})

var server = app.listen(5000, 'localhost', function () {
   var host = server.address().address
   var port = server.address().port
   fs.readFile(__dirname + '/' + 'breakpoints.json', 'utf8', function(err, data) {
      breakpoints = JSON.parse(data);
      console.log(breakpoints, typeof(breakpoints));
   })

   console.log("Example app listening at http://%s:%s", host, port)
})