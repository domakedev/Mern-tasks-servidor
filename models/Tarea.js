const mongoose = require("mongoose");

const TareaSchema = mongoose.Schema({
    nombre: {
        type: "string",
        required: true,
        trim: true,
    },
    estado: {
        type: "boolean",
        default: false,
    },
    creado: {
        type: Date,
        default: Date.now(),
    },
    proyecto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Proyecto",
        required: true,
    },
});

module.exports = mongoose.model("Tarea", TareaSchema);
