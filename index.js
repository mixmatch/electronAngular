'use strict';

const app = require('app');
const BrowserWindow = require('browser-window');
var bodyParser = require('body-parser')
var compression = require('compression');
var express = require('express');
var cp = require('child_process');
var spawn = cp.spawn;
var exec = cp.exec;
//
var oneSecond = 1000;
var oneMinute = 60 * oneSecond;
var oneHour = 60 * oneMinute;
var oneDay = 24 * oneHour;
//
var listenAddr = "localhost";
var listenPort = 3000;

//
var expressApp = express();
// expressApp.use(bodyParser.urlencoded({ extended: true }));
expressApp.use(bodyParser.json());
expressApp.use(compression());
expressApp.use(express.static(__dirname + '/public', { maxAge: oneSecond }));
expressApp.use(express.static(__dirname + '/bower_components', { maxAge: oneSecond }));

var server = expressApp.listen(listenPort, listenAddr, function () {
  var host = server.address().address;
  var port = server.address().port;
  // console.log('Express app listening at http://%s:%s', host, port);
});

// prevent window being GC'd
let mainWindow = null;

app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('ready', function () {
	mainWindow = new BrowserWindow({
		width: 800,
		height: 900,
		resizable: true
	});

	// mainWindow.loadUrl(`file://${__dirname}/index.html`);
	mainWindow.loadURL('http://' + listenAddr + ':' + listenPort);

	mainWindow.on('closed', function () {
		// deref the window
		// for multiple windows store them in an array
		mainWindow = null;
	})
});
