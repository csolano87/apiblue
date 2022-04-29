const express = require('express');
const cors = require('cors');
//const { infinity } = require('../controllers/infinity');
const cookieSession = require('cookie-session')
const cookieParser = require('cookie-parser')
const db = require('../db/connection');
//const { Sequelize } = require('sequelize');
var xmlparser = require('express-xml-bodyparser');



//const store=new session.MemoryStore;
class Server {

    constructor() {
        
        this.app  = express();
        this.port = process.env.PORT;
        this.paths = {
            auth:       '/api/auth',
            infinity:     '/api/buscar',
            categorias: '/api/ordenes',
            usuarios:   '/api/usuarios',
            /*nuevo router*/
            ordenes:       '/api/orden',
            buscarordenes:     '/api/buscarordenes',
            pacientes: '/api/pacientes',
            login:   '/api/login',
            doctor:  '/api/doctor',
        }
          // Conectar a base de datos        
        this.dbConnection();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();

       
    }

    

    middlewares() {

   
       this.app.use( cors());
        this.app.use(cookieParser());
       this.app.use(cookieSession({       
        keys: ['veryimportantsecret'],
        name: "session",
        cookie: {
          httpOnly: true, 
          sameSite: 'none', 
          secure: true
                
        }   
        
        })); 
 
        this.app.use( express.json() );

        this.app.use(xmlparser());
       
        this.app.use( express.static('public') );
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
    /*nuevas router*/

   // this.app.use( this.paths.ordenes, require('../routes/infinity'));
    this.app.use( this.paths.buscarordenes, require('../routes/buscarordenes'));
    this.app.use( this.paths.login, require('../routes/login'));
    this.app.use( this.paths.pacientes, require('../routes/pacientes'));
    this.app.use(this.paths.doctor, require('../routes/doctor'));


    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}




module.exports = Server;
