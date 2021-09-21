const mongoose = require('mongoose');

const UsuariosSchema = mongoose.Schema({
    //Objeto con la configuracion del schema
    nombre:{
        type:String,
        trim: true,
        required: true //Para eliminar espacios inicio y fin
    },
    email:{
        type:String,
        trim: true,
        required: true, //Para eliminar espacios inicio y fin
        unique: true //Para que no permita 2 registros con el mismo campo
    },
    password:{
        type:String,
        trim: true,
        required: true //Para eliminar espacios inicio y fin
    },
    registro:{
        type:Date,
        default: Date.now()
    },

})

//Vamos a registrar el modelo Usuario con el schema: UsuariosSchema
module.exports = mongoose.model('Usuario', UsuariosSchema)

