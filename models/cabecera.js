const { Sequelize, DataTypes, Model } = require('sequelize');
const db =require ('../db/connection');


const Cabecera=db.define('Cabecera',{ 
   
   
    CODLABORATORIO:{
        type:DataTypes.INTEGER
    },
    LABORATORIO:{
        type:DataTypes.STRING,
        primaryKey: true,
    },
    CODTIPOORDEN:{
        type:DataTypes.INTEGER
        
    },
    TIPOORDEN:{
        type:DataTypes.STRING
    },
    CODPROCEDENCIA:{
        type:DataTypes.INTEGER
    } ,
    PROCEDENCIA:{
        type:DataTypes.STRING
    },
    CODSERVICIO:{
        type:DataTypes.INTEGER
    },
    SERVICIO:{
        type:DataTypes.STRING
    },
    CODDOCTOR:{
        type:DataTypes.INTEGER
    },
    DOCTOR:{
        type:DataTypes.STRING
    } ,  
IMPRESORA:{
    type:DataTypes.STRING
},
NUMEROORDEN:{
    type:DataTypes.STRING,
    primaryKey: true,
},
FECHAORDEN:{
    type:DataTypes.DATE
    
},
HORAORDEN:{
    type:DataTypes.TIME
},
TIPOIDENTIFICADOR:{
    type:DataTypes.STRING
} ,
IDENTIFICADOR:{
    type:DataTypes.INTEGER
},
NOMBRES:{
    type:DataTypes.STRING
},
APELLIDO:{
    type:DataTypes.STRING
},
SEGUNDOAPELLIDO:{
    type:DataTypes.STRING
},
FECHANACIMIENTO:{
    type:DataTypes.DATE
} ,
SEXO:{
    type:DataTypes.STRING
},
OBSERVACIONES:{
    type:DataTypes.STRING
} ,

ESTADO:{
    type:DataTypes.BOOLEAN


} ,

} ,
 

{
    freezeTableName: true,
    tableName: "cabeceras" 
} ,
    {
       
        classMethods: {
        associate: function (models) {
              Cabecera.belongsTo(models.Detalle, { foreignKey : 'detalle' });
        }
       }
    


}); 

module.exports= Cabecera; 
