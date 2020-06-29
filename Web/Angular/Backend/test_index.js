'use strict'

var mongoose = require('mongoose');
var app = require('./servidor');
var port = 3900

//Variables
//var url = 'mongodb://localhost:27017/api_rest';
//var opciones = {useNewUrlParser: true};
//

//mongoose.set('userFindandModify', false);
mongoose.set('useNewUrlParser', true);
//mongoose.set('useUnifiedTopology', true);
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/api_rest', {'userFindandModify': false}).then(() => {
    console.log("La conexion a la bbdd se realizado exitosamente");
    //CREACION DE SERVIDOR Y ESCUCHAR PETICIONES HTTP
    app.listen(port, () => {
        console.log('Servidor del corriendo en http://localhost:'+port)
    })
});