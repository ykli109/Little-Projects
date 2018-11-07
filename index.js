var express = require('express');
var fs = require('fs');
var url = require('url');

var http = require('http');

var app = express();

app.engine('html', require('express-art-template'));

app.use('*', function(req, res, next) {
	next();
})

app.use(express.static('./'))

//handle message board application
app.get('/messageBoard', function(req, res) {
	fs.readFile('./messageBoard/public/messages.json', 'utf-8', function(err, data) {
		if (err) {
			res.statusCode = 500;
			res.send('服务器端发生错误...');
		} else {
			var messages = JSON.parse(data).messages;
			res.render('messageBoard.html', {
				messages: messages
			})
		}
	})
})

app.get('/messageBoard/post', function(req, res) {
	fs.readFile('./messageBoard/post.html', 'utf-8', function(err, data) {
		if (err) {
			res.statusCode = 500;
			res.send('服务器端发生错误...');
		} else {
			res.send(data);
		}
	})
})

app.get('/comment', function(req, res) {
	var query = url.parse(req.url, true).query;
	var [date, time] = new Date().toLocaleString().split(' ');
	query.dateTime = date + ' ' + time;
	fs.readFile('./messageBoard/public/messages.json', 'utf-8', function(err, data) {
		if (err) {
			res.statusCode = 500;
			res.send('服务器端发生错误...');
		} else {
			var messages = JSON.parse(data).messages;
			messages.unshift(query);
			var messagesFile = JSON.stringify({
				messages: messages
			});
			fs.writeFile('./messageBoard/public/messages.json', messagesFile, function(err) {
				if (err) {
					res.statusCode = 500;
					res.send('服务器端发生错误...');
				} else {
					res.redirect('messageBoard');
				}
			});
		}
	})
})

// handle 2048 game
app.get('/2048', function(req, res) {
	var query = url.parse(req.url, true).query;
	fs.readFile('./game2048/score.json', 'utf-8', function(err, data) {
		if (err) {
			res.statusCode = 500;
			return res.end();
		} else {
			// get scores information
			var scores = JSON.parse(data).scores;

			// render htmlTemplate
			res.render('game2048.html', {
				"scores": scores
			})

		}
	})
})

app.get('/2048/postScore', function(req, res) {
	var query = url.parse(req.url, true).query;
	fs.readFile('./game2048/score.json', 'utf-8', function(err, data) {
		if (err) {
			res.statusCode = 500;
			return res.end(1);
		} else {
			// get scores information
			var scores = JSON.parse(data).scores;

			// handle user score
			query.user = req.socket.remoteAddress.replace('::ffff:','');
			query.time = new Date();
			scores.unshift(query);
			var scoresFile = JSON.stringify({"scores": scores})
			fs.writeFile('./game2048/score.json', scoresFile, function(err) {
				if (err) {
					res.statusCode = 500;
					return res.end(2);
				}
				res.statusCode = 200;
				return res.send(query);
			})
		}
	})
})


var app = http.createServer(app);

app.listen(80, function() {
	console.log('server is online...')
})
