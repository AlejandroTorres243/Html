`use strict`
var express = require('express')
var ArticleController = require('../controller/cont.article')
const { route } = require('../servidor')

var router = express.Router()

var multipart = require('connect-multiparty')
var md_upload = multipart({ uploadDir: './upload_photo/articles'})

//Rutas de prueba

router.get('/test-messege', ArticleController.testController)
router.get('/HTML', ArticleController.dataHTML)
router.post('/JSON', ArticleController.dataJSON)

//Ruta del articulo
router.post('/save', ArticleController.save)
router.get('/article', ArticleController.getArticles)
//Parametros opcionales (:last?)
router.get('/articles/:last?', ArticleController.getArticles)
router.get('/article/:id', ArticleController.setArticles)
//Ruta de actualizacion
router.put('/article/:id', ArticleController.update)
router.delete('/article/:id', ArticleController.delete)
router.post('/upload-image/:id', md_upload, ArticleController.upload_file)
router.get('/get-image/:image', ArticleController.getImage)
router.get('/search/:search', ArticleController.search)

module.exports = router