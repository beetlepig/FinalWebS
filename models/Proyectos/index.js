let db = require('../../DBMYSQL/index');


exports.getAll = function(creador,done) {
    db.get().getConnection(function (err,connection) {
        if (err){
            connection.release();
            console.log(err);
            return done(err,null);
        } else {
            connection.query('SELECT * FROM proyecto WHERE `creador` = ?',creador, function (err, rows)  {
                if (err) {
                    return done(err);
                }else {
                    done(null, rows);
                }
            });

            connection.release();
        }

    });

};


exports.create = function(nombre, creador, rol, done) {
    let values= [nombre, creador];
    let roli=rol;
    let insertIDI;

    db.get().getConnection(function (err,connection) {
        if (err){
            console.log(err);
            return done(err);
        } else {
            connection.query('INSERT INTO proyecto (nombre, creador) VALUES(?, ?)', values, function(err, result) {
                if (err) {
                    console.log(err);
                    return done(err,null);
                }else {
                  insertIDI=result.insertId;
                  const valuestwo=[creador,insertIDI,roli,1];
                    connection.query('INSERT INTO miembros (id_user, proyecto_id, rol, dueño) VALUES(?, ?, ?, ?)', valuestwo, function(errtwo, resultwo) {
                        if (err) {
                            console.log(errtwo);
                            return done(errtwo);
                        }else {

                            done(null, resultwo.insertId);
                        }
                    });
                }
            });


        }
        connection.release();
    });
};


