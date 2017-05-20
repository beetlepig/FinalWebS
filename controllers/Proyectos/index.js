let DB= require('../../models/Proyectos/index');
let fs = require('fs');
let mkdirp = require('mkdirp');


function getProyectos(req, res) {
    let creador= req.body.creador;
    console.log(creador);
    DB.getAll(creador , function(error, pots) {
        if (!error) {
            res.status(200).json(pots);

        } else {

            console.log(error);
            res.status(500).json(error);
        }

    });
}

let createProyecto = function (req, res) {
    let nombre = req.body.nombre;
    let creador= req.body.creador;
    let rol= req.body.rol;

    DB.create(nombre, creador, rol, function(err, result) {

        if (err) {
            console.log(err);
            res.status(500).json(err);

        }else {
            res.status(200).json(result);

        }
    });

};





module.exports = {
    getProyectos,
    createProyecto
};