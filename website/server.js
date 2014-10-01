var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();
var port = 8085;

app.use(express.static(__dirname + '/static'));
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/signup', function(req, res) {
    fs.appendFileSync('prijavi.txt', JSON.stringify(req.body) + '\n');
    console.log(req.body);
    res.header({ 'content-type': 'text/html'});
    res.write('Успешно се пријави! Врати се <a href="/">назад</a>.');
    res.write('<script>setTimeout(function() { window.location.href = "/"; }, 3000)</script>');
    res.end();
});

console.log('listening on port:', port);
app.listen(port);
