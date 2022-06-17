const  {Sequelize}  = require('sequelize');
//const { Sequelize, Op, Model, DataTypes } = require("sequelize");


/* const   db =new Sequelize('apiRes','postgres','admin123',{ 
    host:'localhost',
    dialect:'postgres',

}); */


const   db =new Sequelize('dc3k4f4f718eoq','stpvogsbhxcsfx','e0ecd2f60f2a61d1e8cbd77736ef61c195d93bb81239549d13e015ad4223c533',{ 
    host:'ec2-3-226-165-146.compute-1.amazonaws.com',
    dialect:'postgres',
    dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      }
      

});

module.exports=db;