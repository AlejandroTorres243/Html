`use strict`

var mongoose = require('mongoose')
var schema = mongoose.Schema

//SCHEMA DE ARTICULOS
var ArticleSchema = schema({
    _id: Number,
    title: String,
    content: String,
    date: {type: Date, default: Date.now},
    image: String
})

//EXPORTANDO MODELO DEL ARTICULO
module.exports = mongoose.model('Article', ArticleSchema)