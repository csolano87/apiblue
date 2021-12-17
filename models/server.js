const express = require('express');
const cors = require('cors');
const db = require('../db/connection');
//const { Sequelize } = require('sequelize');
var xmlparser = require('express-xml-bodyparser');

class Server {

    constructor() {
        
        this.app  = express();
        this.port = process.env.PORT;
        this.paths = {
            auth:       '/api/auth',
            infinity:     '/api/buscar',
            categorias: '/api/ordenes',
            //productos:  '/api/productos',
            usuarios:   '/api/usuarios',
        }



     


        // Conectar a base de datos
        
        this.dbConnection();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    

    middlewares() {

        // CORSc
       this.app.use( cors() );

      //this.app.options("*", cors({ origin: 'http://localhost:8092', optionsSuccessStatus: 200 }));

       //this.app.use(cors({ origin: "http://localhost:8092", optionsSuccessStatus: 200 }));
       
        // Lectura y parseo del body
        this.app.use( express.json() );

        this.app.use(xmlparser());
       // var xmlparser = require('express-xml-bodyparser');
        // Directorio Público
      //  this.app.use( express.static('public') );

    }
    async dbConnection() {
        try {
            await db.authenticate();

            console.log('Database online');
        } catch (error) {
            throw new Error(error);
        }
    }
    routes() {
        this.app.use( this.paths.auth, require('../routes/auth'));
        this.app.use( this.paths.categorias, require('../routes/categoria'));
        this.app.use( this.paths.usuarios, require('../routes/usuarios'));
        this.app.use( this.paths.infinity, require('../routes/infinity'));
       /*  this.app.use( this.authPath, require('../routes/auth'));
        this.app.use( this.usuariosPath, require('../routes/usuarios')); */

    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}




module.exports = Server;
