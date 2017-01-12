var express = require('express'); 
var bodyParser = require('body-parser'); 
var cors = require('cors');

var app = new express(); 
app.use(bodyParser.json()); 
app.use(cors()); 
app.listen(process.env.PORT);

var data = [{id:1},{id:2},{id:3}];
app.post('/regiuni', function(request, response) { 
response.status(201).send(request.body); 
});
app.get('/regiuni', function(request, response) { 
response.status(200).send(data); 
});
app.get('/regiuni/:id', function(request, response) { 
response.status(200).send(data[0]); 
});
app.put('/regiuni/:id', function(request, response) { 
response.status(201).send(request.body); 
});
app.delete('/regiuni/:id', function(request, response) { 
response.status(201).send('Deleted' + request.params.id); 
});

var nodeadmin = require('nodeadmin'); 
app.use(nodeadmin(app)); 

var Sequelize = require("sequelize");
var sequelize = new Sequelize('database', 'username', 'password', { 
    dialect: 'mysql', 
    host: '127.0.0.1', 
    port: 3306 
    });

var Regiuni = sequelize.define('regiuni', {
    zone: {     
        type: Sequelize.STRING,
        field: 'nord' 
        },
    zone: {     
        type: Sequelize.STRING,
        field: 'centru' 
        },
    zone: {     
        type: Sequelize.STRING,
        field: 'sud' 
        },
        }, 
        { timestamps: false });
        
app.post('/regiuni', function(request,response) { 
    Regiuni.create(request.body).then(function(regiuni) {
        Regiuni.findById(regiuni.id).then(function(regiuni) {
            response.status(201).send(regiuni);       
            }); 
    }); 
});

app.get('/regiuni', function(request,response){
    Regiuni.findAll().then(function(regiuni){
        response.status(200).send(regiuni);     
    }); 
});

app.get('/regiuni/:id', function(request,response){     
    Regiuni.findById(request.params.id).then(function(regiuni){
        if(regiuni) {
            response.status(200).send(regiuni);
            } 
            else {
                response.status(404).send();       
            }     
    });
});

app.put('/regiuni/:id', function(request,response){
    Regiuni
        .findById(request.params.id)
        .then(function(regiuni){
            if(regiuni) {
                regiuni
                    .updateAttributes(request.body)
                    .then(function(){
                        response.status(200).send('updated'); 
                    })                    
                    .catch(function(error){
                        console.warn(error);
                        response.status(500).send('server error');
                        });
                        } 
                        else {
                            response.status(404).send();
                            }
                });
            });