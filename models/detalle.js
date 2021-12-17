 const { Sequelize, DataTypes, Model } = require('sequelize');
const db =require ('../db/connection');
const Cabecera = require('./cabecera');


const Detalle=db.define('Detalle',{ 
// CODE:{
//     type:DataTypes.STRING
// },
CODEXAMEN:{
    type:DataTypes.INTEGER
},
EXAMEN:{
    type:DataTypes.STRING
} ,
COMENTARIO:{
    type:DataTypes.STRING
} ,
IDCABECERA:{
    type:DataTypes.INTEGER
} ,

},

{
   
    classMethods: {
     associate: function (models) {
      Detalle.hasMany(models.Cabecera, { as: 'detalle', foreignKey : 'detalle' });
     }
    },



    freezeTableName: true,
    tableName: "detalles"

});

Cabecera.hasMany(Detalle, { foreignKey: 'IDCABECERA' });

    




// Usuario.methods.toJSON = function() {
//     const { __v, password, id, ...usuario  } = this.toObject();
//     usuario.uid = _id;
//     return usuario;
// }
module.exports= Detalle; 