let DB= require('../../models/Posts/index');
let fs = require('fs');
let mkdirp = require('mkdirp');


function getPosts(req, res) {
    DB.getAll(function(error, pots) {
        if (!error) {
            res.status(200).json(pots);

        } else {

            console.log(error);
            res.status(500).json(error);
        }

    });
}

let createPosts = function (req, res) {
    let id_usuario = req.body.id_usuario;
    let titulo= req.body.titulo;
    let contenido= req.body.contenido;
    let subtitulo = req.body.subtitulo;
    let target = 30000;
    let current = 0;
    let extencion = req.file.originalname.split(".")[req.file.originalname.split(".").length -1];
    let titulosinpuntos= titulo.replace(':', '');
    let titulo_final= titulosinpuntos.replace(/\s+/g, '');
    let targetPath = '../ServerDB/Posts/'+titulo_final+"."+id_usuario+'/' +titulo_final+"_"+id_usuario+"_PostImg" +"."+extencion;
    console.log(id_usuario);
    console.log(titulo);
    console.log(subtitulo);
    console.log(target);
    console.log(current);
    console.log(contenido);
    console.log(targetPath);
    console.log(req.file.originalname);

    mkdirp('../ServerDB/Posts/'+titulo_final+"."+id_usuario+'/', function(err) {

        if(!err){
            fs.rename(req.file.path, targetPath, function(err) {
                if (err) {

                    throw err;
                }


            });
        } else{
            console.log(err);
        }

    });




    let src= titulo_final+"."+id_usuario+'/' + titulo_final+"_"+id_usuario+"_PostImg" +"."+extencion;
    console.log(src);
    DB.create(id_usuario,titulo, subtitulo, contenido, target, current , src, function(err, result) {

        if (err) {
            console.log(err);
            res.status(500).json(err);

        }else {
            res.status(200).json(result);

        }
    });

};


function setLike(req, res) {
let id_usuario=req.body.id_usuario;
let id_post=req.body.id_post;
DB.setLike(id_usuario,id_post, function (err, result) {
    if (err){
        console.log(err);
        res.status(500).json(err);
    }else {
        console.log(result);
        res.status(200).json(result);

    }
});
}



module.exports = {
    getPosts,
    createPosts,
    setLike
};