var express = require('express');

//modules
var sites = require("./sites");
var users = require("./users");
var config = require("./config.json").server;

var app = express();

//sites
app.get('/sites', sites.findAll);
app.get('/sites/:id', sites.findById);
app.get('/sites/:url', sites.findByUrl);
app.get('/sites/:id/links', sites.getLinks);
app.post('/sites', sites.add);
app.put('/sites/:id', sites.update);
app.delete('/sites/:id', sites.remove);

//USERS
app.get('/users', users.findAll);
app.get('/users/:id', users.findById);
app.post('/users', users.add);
app.put('/users/:id', users.update);
app.delete('/users/:id', users.remove);

app.listen( config.port );
console.log("Listening on port " + config.port + "...");
