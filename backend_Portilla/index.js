const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const { json } = require("express");

const app = express();

//querys principales de select
const SELECT_ALL_SEMAFORO_QUERY = "Select * from semaforo";
const SELECT_ALL_USUARIO_QUERY = "Select * from usuario";

//llamando a la db
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '0000',
    database: 'covid_force'
});

connection.connect(err => {
    if (err) {
        return err;
    }
});



app.use(cors());

//pagina principal del conectador
app.get("/", (req, res) => {
    res.send("vaya a /semaforo para ver los semaforos o vaya a /usuario para ver los usuarios")

});

//peticiones para el semaforo
app.get("/semaforo/add", (req, res) => {
    const { color } = req.query;
    console.log(color);
    const INSERT_SEMAFORO_QUERY = `INSERT INTO semaforo(color) VALUES ("${color}") `
    connection.query(INSERT_SEMAFORO_QUERY, (err, results) => {
        if (err) {
            return res.send(err)

        }
        else {

            return res.send("Semaforo creado correctamente")
        }
    });
});

//peticiones para el usuario
app.get("/usuario/add", (req, res) => {
    const {cedula,email,nombre,apellido,fecha_nacimiento,contrasena} = req.query;
    console.log(cedula,email,nombre,apellido,fecha_nacimiento,contrasena);
    const INSERT_USUARIO_QUERY = `INSERT INTO usuario(cedula,email,nombre,apellido,fecha_nacimiento,contrasena) VALUES ("${cedula}","${email}","${nombre}","${apellido}","${fecha_nacimiento}","${contrasena}") `
    connection.query(INSERT_USUARIO_QUERY, (err, results) => {
        if (err) {
            return res.send(err)

        }
        else {

            return res.send("Usuario creado correctamente")
        }
    });
});
//peticion para asignar semaforo al usuario
app.get("/usuario/update", (req, res) => {
    const {id_semaforo,cedula,direccion} = req.query;
    console.log(id_semaforo);
    const UPDATE_USUARIO_QUERY = `UPDATE usuario SET id_semaforo= ${id_semaforo},direccion= "${direccion}" WHERE (cedula="${cedula}") `
    connection.query(UPDATE_USUARIO_QUERY, (err, results) => {
        if (err) {
            return res.send(err)

        }
        else {

            return res.send("Update hecho correctamente")
        }
    });
});


//select para el semaforo
app.get("/semaforo", (req, res) => {
    connection.query(SELECT_ALL_SEMAFORO_QUERY, (err, results) => {
        if (err) {
            return res.send(err)
        }
        else {
            return res.json({
                data: results
            })
        }

    });
});

//select para el usuario
app.get("/usuario", (req, res) => {

    connection.query(SELECT_ALL_USUARIO_QUERY, (err, results) => {
        if (err) {
            return res.send(err)
        }
        else {
            return res.json({
                data: results
            })
        }

    });
});

//coneccion 
app.listen(4000, () => {
    console.log("Listen on port: 4000");

});