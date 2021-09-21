const mongoose = require('mongoose');

const ProyectoSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
    },
    creador: {
        //Tipo id 
        type: mongoose.Schema.Types.ObjectId,
        //Referencia de donde sacara ese ID
        ref: 'Usuario'
    },
    fechaCreacion: {
        type: Date,
        default: Date.now()
    },


})

module.exports = mongoose.model('Proyecto', ProyectoSchema)