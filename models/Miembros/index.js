let db = require('../../DBMYSQL/index');


exports.getAll = function(id_proyecto,done) {
    db.get().getConnection(function (err,connection) {
        if (err){
            connection.release();
            console.log(err);
            return done(err,null);
        } else {
            connection.query('SELECT * FROM miembros WHERE `proyecto_id` = ?',id_proyecto, function (err, rows)  {
                if (err) {
                    return done(err, null);
                }else {
                    done(null, rows);
                }
            });

            connection.release();
        }

    });

};

exports.getAllTareas = function(correo_member, id_proyecto, done) {
    let values= [id_proyecto,correo_member];
    db.get().getConnection(function (err,connection) {
        if (err){
            connection.release();
            console.log(err);
            return done(err,null);
        } else {
            connection.query('SELECT * FROM tareas where `id_proyecto` = ? and `id_usuario` = ?',values, function (err, rows)  {
                if (err) {
                    return done(err, null);
                }else {
                    done(null, rows);
                }
            });

            connection.release();
        }

    });

};

exports.createTarea = function(correo_member, id_proyecto, tarea, fecha, done) {
    let values= [id_proyecto,correo_member, tarea, fecha];
    db.get().getConnection(function (err,connection) {
        if (err){
            connection.release();
            console.log(err);
            return done(err,null);
        } else {
            connection.query('INSERT INTO tareas ( id_proyecto, id_usuario, tarea, fecha_entrega ) VALUES( ?, ?, ?, ?)',values, function (err, rows)  {
                if (err) {
                    return done(err, null);
                }else {
                    done(null, rows);
                }
            });

            connection.release();
        }

    });

};




exports.create = function(correo, proyecto , rol, done) {
    let values= [correo, proyecto, rol];

    db.get().getConnection(function (err,connection) {
        if (err){
            connection.release();
            console.log(err);
            return done(err);
        } else {
            connection.query('INSERT INTO miembros (id_user, proyecto_id, rol) VALUES(?, ?, ?)', values, function(err, result) {
                if (err) {
                    console.log(err);
                    return done(err);
                }

                done(null, result.insertId);
            });

            connection.release();
        }

    });
};


