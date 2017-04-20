var app = require('http').createServer(handler),
    io = require('socket.io').listen(app),
    fs = require('fs'),
    sys = require('sys'),
    twitter = require('twitter');

    var fs = require('fs');
    var gm = require('gm');

app.listen(3000);

var twit = new twitter({
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: ''
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
