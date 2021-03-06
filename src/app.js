'use strict';

const express    = require('express');
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');

const config = require('./config');
const app    = express();
const router = express.Router();

// Connecta ao banco
mongoose.connect(config.connectionString);

//Carrega os models
const User    = require('./model/user');
const Project = require('./model/project');
const Task    = require('./model/task');

// Carrega as Rotas
const indexRoute = require('./routes/index-route');
const userRoute  = require('./routes/user-route');
const projRoute  = require('./routes/project-route');
const taskRoute  = require('./routes/task-route');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json({
	limit: '5mb'
}));
app.use(bodyParser.urlencoded({ 
	extended: false
}));

// Habilita o CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use('/api',indexRoute);
app.use('/users',userRoute);
app.use('/projects',projRoute);
app.use('/tasks',taskRoute);

module.exports = app; 