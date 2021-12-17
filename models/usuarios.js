const { Sequelize, DataTypes, Model } = require('sequelize');
const db =require ('../db/connection');


const Usuario=db.define('Usuario',{ 
    
nombre:{
    type:DataTypes.STRING
},
apellido:{
    type:DataTypes.STRING
},
usuario:{
    type:DataTypes.STRING
},
password:{
    type:DataTypes.STRING
},
rol:{
    type:DataTypes.STRING


} ,

estado:{
    type:DataTypes.BOOLEAN


} ,
},

{
    freezeTableName: true,
    tableName: "usuarios"

}); 
// Usuario.methods.toJSON = function() {
//     const { __v, password, id, ...usuario  } = this.toObject();
//     usuario.uid = _id;
//     return usuario;
// }
module.exports= Usuario; 