var app = require('http').createServer(handler),
    io = require('socket.io').listen(app),
    fs = require('fs'),
    sys = require('sys'),
    twitter = require('twitter');

    var fs = require('fs');
    var gm = require('gm');

app.listen(3000);

var twit = new twitter({
  consumer_key: '0vXnCSHSS8Nmk0HAMvz93QTVZ',
  consumer_secret: 'IyQbPsMQEZgCtzUP6iLeeQnENpcyHrOI7poeIzrD0GOH716gH5',
  access_token_key: '16627470-bfYO3cs3ohszczULFKp0pegQ4ksMc1TrA3txUqoiD',
  access_token_secret: 'EjqMsTfV16SCKwX6iSvbMesTIvkF3t7MxOgTQCCM7qnFf'
});

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

var twee = io.of('tweet');


twit.stream('statuses/filter', { track: 'lukecage' }, function(stream) {
  stream.on('data', function (data) {
    io.sockets.emit('tweet', data.text);

    var imageText = data.text;
    var imageName = data.id;

    gm('inputimages/test.jpg')
    .fill("#ffffff")
    .font("fonts/opensans.ttf", 22)
    .drawText(100, 300, imageText)
    .write(("outputimages/" + imageName + ".png"), function (err) {
      if (!err){ console.log('done')
    }else{
      console.log(err)
    };
  });


    console.log('TWWWWEEEEETTT!');
  });
});
