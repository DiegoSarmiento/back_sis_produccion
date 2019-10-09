//express
const express = require('express');

 //importar parser de JSON
const bodyParser = require('body-parser');

//para registrar las peticiones que llegan
const morgan = require('morgan');

//metodo path se encarga de unir directorios
const path = require('path');

const app = express();

const server = require('http').createServer(app);

require('./database/database');

app.set('port', process.env.PORT || 3013);

//Middlewares 
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//-------Configuración------
    //--------Cors--------
    app.use((req,res,next)=>{
        res.header('Access-Control-Allow-Origin','*');
        res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
        res.header('Access-Control-Allow-Methods','GET,POST,OPTIONS,PUT,DELETE');
        res.header('Allow','GET,POST,OPTIONS,PUT,DELETE');
        next();
    });
    //--------Rutas--------
    //importando routes
    const usuarios = require('./routes/usuarios.routes');
    const clientes = require('./routes/clientes.routes');

    app.use('/api/usuarios', usuarios);
    app.use('/api/clientes', clientes);

    //Escuchando el Servidor
    server.on('listening',function(){
        console.log('Servidor en el puerto', app.get('port'));
    });
    
    server.listen(app.get('port'));