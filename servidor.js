const http = require("http");
const url = require("url");
const fs = require("fs");
const { MongoClient } = require("mongodb");
const urlConexion = "mongodb://127.0.0.1:27017";
const client = new MongoClient(urlConexion);
const bd = "harry";
const coleccion = "personajes";

http.createServer(function (peticion, respuesta) {
    let urlBase = url.parse(peticion.url, true);
    let pathname = urlBase.pathname;
    console.log(pathname);
    respuesta.setHeader('Access-Control-Allow-Origin', '*');
    respuesta.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    if (pathname == '/filtrar') {
        let datosPost = '';
        peticion.on('data', function (data) {
            datosPost += data;
        }).on('end', function () {
            let parametros;
            let datos;
            if (peticion.method === 'GET') {
                datos = urlBase.query;
            }
            else {

                datos = datosPost;
            }
            parametros = new URLSearchParams(datos);
            let filtro = {};

            consultar(bd, coleccion, filtro, respuesta)
                .then(respuesta)
                .catch(console.error)
                .finally(() => client.close());
        });
    }
    else if (pathname == '/humanos') {
        let datosPost = '';
        peticion.on('data', function (data) {
            datosPost += data;
        }).on('end', function () {
            let parametros;
            let datos;
            if (peticion.method === 'GET') {
                datos = urlBase.query;
            }
            else {
                datos = datosPost;
            }
            parametros = new URLSearchParams(datos);
            let filtro = { species: "human" };
            consultar(bd, coleccion, filtro, respuesta)
                .then(respuesta)
                .catch(console.error)
                .finally(() => client.close());
        });
    }
    else if (pathname == '/vivos') {
        let datosPost = '';
        peticion.on('data', function (data) {
            datosPost += data;
        }).on('end', function () {
            let parametros;
            let datos;
            if (peticion.method === 'GET') {
                datos = urlBase.query;
            }
            else {
                datos = datosPost;
            }
            parametros = new URLSearchParams(datos);
            let filtro = { alive: true, hogwartsStudent: true };
            consultar(bd, coleccion, filtro, respuesta)
                .then(respuesta)
                .catch(console.error)
                .finally(() => client.close());
        });
    }
    else if (pathname == '/fecha') {
        let datosPost = '';
        peticion.on('data', function (data) {
            datosPost += data;
        }).on('end', function () {
            let parametros;
            let datos;
            if (peticion.method === 'GET') {
                datos = urlBase.query;
            }
            else {
                datos = datosPost;
            }
            parametros = new URLSearchParams(datos);
            //less than
            let filtro = { yearOfBirth: { $lt: 1979 } };


            consultar(bd, coleccion, filtro, respuesta)
                .then(respuesta)
                .catch(console.error)
                .finally(() => client.close());
        });
    }
    else if (pathname == '/madera') {
        let datosPost = '';
        peticion.on('data', function (data) {
            datosPost += data;
        }).on('end', function () {
            let parametros;
            let datos;
            if (peticion.method === 'GET') {
                datos = urlBase.query;
            }
            else {
                datos = datosPost;
            }
            parametros = new URLSearchParams(datos);
            let filtro = { "wand.wood": "holly" };
            consultar(bd, coleccion, filtro, respuesta)
                .then(respuesta)
                .catch(console.error)
                .finally(() => client.close());
        });
        
    }else {

        if (pathname == '/importar') {
            fs.readFile("harry-potter-characters.json", function (err, datos) {
                if (err) throw err;
                let baseDatos = "harry";
                let coleccion = "personajes";
                crearColeccion(baseDatos, coleccion)
                    .then(console.log)
                    .catch(console.error);
                insertar(baseDatos, coleccion, JSON.parse(datos))
                    .then(console.log)
                    .catch(console.error)
                    .finally(() => client.close());
            })
        }
    }
}).listen(8080, function (err) {
    if (err) {
        console.log("Error al iniciar el servidor");
    }
    console.log("Servidor corriendo en 8080");
});
async function consultar(bd, coleccion, filtro, respuesta) {
    await client.connect();
    console.log("conexion correcta");
    const dbo = client.db(bd);
    const resultado = await dbo.collection(coleccion).find(filtro).toArray();
    console.log("documentos encontrados" + resultado);
    respuesta.end(JSON.stringify(resultado));
    return JSON.stringify(resultado);
}
async function crearColeccion(baseDatos, coleccion) {
    await client.connect();
    console.log("Conexión correcta");
    const dbo = client.db(baseDatos);
    let createResult = await dbo.createCollection(coleccion);
    console.log("Colección creada =>", createResult.collectionName.collection);
}
async function insertar(baseDatos, coleccion, datos) {
    await client.connect();
    console.log("Conexión correcta");
    const dbo = client.db(baseDatos);
    let insertResult = await dbo.collection(coleccion).insertMany(datos);
    console.log("Documentos insertados =>", insertResult);
}


