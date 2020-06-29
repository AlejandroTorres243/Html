'use strict'

//CARGAMOS LOS MODULOS DE NODE PARA CREAR EL SERVIDOR
var express = require('express')
var bodyparser = require('body-parser')

//EJECUTAMOS EXPRESS (HTTP)
var app = express()

//CARGAMOS FICHEROS DE RUTAS
var articles_routers = require('./routes/rout.articles')

//MIDLEWARES
app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json())

//CORS
// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//AÑADO LOS PREFIJOS o LAS RUTAS / cargar rutas
app.use('/api/',articles_routers)

//RUTA O METODO DE PRUEBA PARA LA API REST
/*
app.get("/probando", (req, res) =>{
    return res.status(200).send(`
        <ul>
            <li>Angular</li>
            <li>NodeJS</li>
            <li>NestJS</li>
            <li>React</li>
            <li>Vue</li>
        </ul>
    `)
});
*/
//EXPORTAR MODULO (FICHERO ACTUAL)
module.exports = app