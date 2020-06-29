`use strict`

var validator = require('validator')
var Article = require('../models/mod.article')
var fs = require('fs')
var path = require('path')
const { exists } = require('../models/mod.article')

var controller = {
    dataHTML: (req, res) =>{
        return res.status(200).send(`
            <ul>
                <li>Angular</li>
                <li>NodeJS</li>
                <li>NestJS</li>
                <li>React</li>
                <li>Vue</li>
            </ul>
        `)
    },

    dataJSON: (req, res) =>{
        var sms = req.body.mensaje
        return res.status(200).send({
            Autor: 'Manuel Alejandro Higueras Torres',
            Derechos_Reservados: true,
            sms
        })
    },

    testController: (req, res) =>{
        return res.status(200).send({
            message: 'Test Success'
        })
    },

    save: (req, res) =>{
        //RECOGEMOS PARAMETROS(DATOS) POR POST
        var params = req.body
        
        //VALIDAMOS
        try{
            var validator_title = !validator.isEmpty(params.title)
            var validator_content = !validator.isEmpty(params.content)
        }
        catch(err){
            return res.status(200).send({
                status:'K0',
                article: 'Faltan datos por enviar!!!!!!'
            })
        }

        if(validator_title && validator_content){
            //CREAMOS OBJETO A GUARDAR
            var article = new Article()

            //ASIGNAMOS LOS VALORES(PARAMETROS)
            article._id = params._id
            article.title = params.title
            article.content = params.content
            article.image = null

            //GUARDAMOS EL ARTICULO 
            article.save((err, articleStored) =>{
                if(err || !articleStored){
                    return res.status(404).send({
                        status: 'K0',
                        article: 'THE ARTICLE IS NOT SAVE, TRY AGAIN!!!!!!'
                    })      
                }
                //DEVOLVEMOS UNA RESPUESTA
                return res.status(200).send({
                    status: 'OK',
                    article: articleStored
                })                
            })

        }
        else{
            return res.status(200).send({
                status: 'K0',
                article: 'DATA INCORRECT, TRY AGAIN!!!!!!'
            })            
        }

    },

    getArticles: (req, res) => {

        //Busqueda de cada 5 datos
        var last = req.params.last;
        var query = Article.find({})

        if(last || last != undefined){
            query.limit(5)
        }

        //usar un Find para buscar y mostrar (BUSQUEDA DE TODOS LOS DATOS)
        query.sort('_id').exec((err,article) => {
            
            if(err){
                return res.status(200).send({
                    status: 'K0',
                    article: 'ERROR, CANNOT DISPLAY DATA, TRY AGAIN!!!!!!'
                })                
            }
            
            if(!article){
                return res.status(404).send({
                    status: 'K0',
                    article: 'NO DATA AVAILABLE!!!!!!'
                })                
            }

            return res.status(200).send({
                status: 'OK',
                article
            })            
        })
  
    },

    setArticles: (req, res) => {
        //Recogemos el id de la url
        var article_id = req.params.id

        //Comprobamos si existe 
        if(!article_id || article_id == null){
            return res.status(404).send({
                status: 'K0',
                article: 'NO EXITS DATA AVAILABLE!!!!!!'
            })              
        }

        //Busco el articulo
        Article.findById(article_id, (err, article) => {
            if(err || !article){
                return res.status(404).send({
                    status: 'K0',
                    message: 'NO EXITS DATA AVAILABLE!!!!!!'
                })        
            }

            //Devolvemos un JSON
            return res.status(404).send({
                status: 'OK',
                article
            })    

        })
    },

    update: (req, res) => {
        //Recogemos los datos del articulo por la url
        var article_id = req.params.id
        
        //Recogemos los datos que llegan por la peticion del put
        var params = req.body
        
        //validamos
        try {
            var validator_title = !validator.isEmpty(params.title)
            var validator_content = !validator.isEmpty(params.content)
        } catch (error) {
            return res.status(404).send({
                status: 'K0',
                message: 'MISSING DATA TO SEND!!!!!!'
            })   
        }

        if(validator_title && validator_content){
            //buscamos y actualizamos    
            Article.findByIdAndUpdate({_id: article_id}, params, {new: true}, (error, article_update) => {
                if(error){
                    return res.status(404).send({
                        status: 'K0',
                        message: 'ERROR IN THE UPDATE !!!!!!!'
                    })
                }
                if(!article_update){
                    return res.status(404).send({
                        status: 'K0',
                        message: 'THE ARTICLE IS NOT EXISTS!!!!!!!'
                    })
                }
                return res.status(200).send({
                    status: 'SUCESS',
                    message: 'THE ARTICLE WAS UPDATED',
                    article: article_update
                })
            })
        }
        else{
            //devolvemos respuesta con los datos
            return res.status(404).send({
                status: 'K0',
                message: 'THE VALIDATOR HAS FAILED'
            })
        }
  
    }, 

    delete: (req, res) => {
        //Recoger el id de la url
        var article_id = params.id

        //Busqueda y eliminacion
        Article.findByIdAndRemove({_id: article_id}, (error, article_delete) => {
            if(error){
                return res.status(500).send({
                    status: 'K0',
                    message: 'ERROR, THE DELETE HAS FAILED'
                })
            }

            if(!article_delete){
                return res.status(404).send({
                    status: 'K0',
                    message: 'ERROR IN THE DELETE OF ARTICLE OR NOT EXIST!!!!!'
                })
            }

            return res.status(200).send({
                status: 'SUCESS',
                article: article_delete
            })
        })

    },

    upload_file: (req, res) =>{
        //Configurar el modulo (connet multiparty) en el router

        //Recoger el fichero de la peticion
        var filename = 'Imagen no subida...'

        //Verificaion si llega la foto
        if(!req.files){
            return res.status(404).send({
                status: 'ERROR',
                message: filename
            })
        }

        //Conseguir el nombre y la extension del archivo
        var file_path = req.files.file0.path
        var file_split = file_path.split('\\')

        /*ADVERTENCIA EN LINUX O MAC - (//) */

        //Nombre del archivo
        var file_name = file_split[2]

        //Extension del ficheroç
        var extension_split = file_name.split('\.')
        var file_ext = extension_split[1]

        
        //Comprobar la extension, solo imagenes; si es valida borrar el fichero
        if(file_ext != 'png' && file_ext != 'jpg' && file_ext != 'jpeg' && file_ext != 'gif'){
            //BORRO EL ARCHIVO SUBIDO
            fs.unlink(file_path, (err) =>{
                return res.status(200).send({
                    status: 'ERROR',
                    message: 'The extension is invalid!!!'
                })
            })
        }
        //SINO BUSCO EL ARCHIVO SUBIDO, ASIGNO EL NOMBRE DE LA IMAGEN Y LO ACTUALIZO
        else {

            var articleId = req.params.id
            Article.findOneAndUpdate({_id: articleId}, {image: file_name}, {new: true}, (err, article_update) => {
                
                if(err || !article_update){
                    return res.status(200).send({
                        status: 'ERRROR',
                        message: 'the image could not be loaded!!!!'
                    })
                }
                
                return res.status(200).send({
                    status: 'SUCESS', 
                    article: article_update
                }) 
            })
        }

    },

    getImage: (req, res) =>{
        
        var file = req.params.image
        var path_file = "./upload_photo/articles/"+file

        fs.exists(path_file, (exists) =>{
            console.log(exists)
            if(exists){
                return res.sendFile(path.resolve(path_file))
            }
            else{
                return res.status(404).send({
                    status: 'ERROR',
                    message: 'The image is not exists !!!!'
                })
            }
        })
    },

    search: (req, res) =>{
        //Sacamos el string a buscar
        var searchString = req.params.search

        Article.find({ "$or": [
            {"title": {"$regex": searchString, "$options": "i"}},
            {"content": {"$regex": searchString, "$options": "i"}}

        ]})
        .sort([['date', 'descending']])
        .exec((err, articles) => {
            
            if(err){
                return res.status(500).send({
                    status: "ERROR",
                    message: "Problem in the process!!!!!"
                })

            }
            
            if(!articles || articles.length <= 0){
                return res.status(404).send({
                    status: 'ERROR',
                    message: 'No exist the article!!!!!'
                })
            }

            return res.status(200).send({
                status: 'SUCCESS',
                articles
            })
        })

        //los encontramos y colocamos las condicion
        return res.status(404).send({
            status: 'ERROR', 
            message: 'The image isn`t exists!!!!!!'
        })
    }

}

module.exports = controller