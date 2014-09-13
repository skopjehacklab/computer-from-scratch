var express = require('express');

var app = express();
var port = 8085;

app.use(express.static(__dirname + '/static'));

app.post('/signup', function(req, res) {
    res.end('success');
});

console.log('listening on port:', port);
app.listen(port);
