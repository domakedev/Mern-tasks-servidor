//Importamos el modelo, nos permitira usar mongoose
const Tarea = require("../models/Tarea");
const Proyecto = require("../models/Proyecto");
//Importamos el check validator
const { validationResult } = require("express-validator");


//Creamos una nueva tarea
exports.crearTarea = async (req, res) => {

    //Revisar si hay errores
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
    }

    
    try {
        //Extraemos el proyecto del req
        const { proyecto } = req.body

        //Revisar si existe el proyecto
        const existeProyecto = await Proyecto.findById({ _id: proyecto })
        if (!existeProyecto) {
            return res.status(404).json({ message: "No existe tal proyecto" })
        }

        //Revisamos si es el creador
        if (req.usuario.id !== existeProyecto.creador.toString()) {
            return res.status(501).json({ message: "No eres el creador, chuchu" })
        }

        //Creamos la tarea
        const tarea = new Tarea(req.body);

        //Guardamos la tarea
        tarea.save();
        res.json(tarea);

    } catch (e) {
        console.log(e);
        res.status(500).send("Hubo un error en TareaController");
    }
};



//Extraemos todas las tareas de un proyecto
exports.extraerTareas = async (req, res) => {
    //Revisar si hay errores
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
    }


    try {
        //Extraer proyecto del req
        const { proyecto } = req.query

        //Validar que el proyecto existe
        const proyectoExiste = await Proyecto.findById({ _id: proyecto })
        if (!proyectoExiste) {
            return res.status(404).json({ message: "No se encontro el proyecto" })
        }

        //Validar si el creador que solicita es el mismo que el dueño del proyecto solicitado
        const esElCreador = await req.usuario.id === proyectoExiste.creador.toString()
        if (!esElCreador) {
            return res.status(501).json({ message: "No eres el dueño chuchu" });
        }

        console.log(proyecto);
        const tareas = await Tarea.find({ proyecto: proyecto })
        res.json(tareas)
    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error en TareaController-ExtraerTareas");
    }
}

//Actualizamos una tarea
exports.actualizarTarea = async (req, res) => {

    //Revisar si hay errores
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
    }


    try {
        //Verificar si existe la tarea
        let tareaExiste = await Tarea.findById({ _id: req.params.id })
        const tareaNueva = {}

        //Verificar si el que quiere modificar es el creador
        const proyectoIdDeTarea = await tareaExiste.proyecto.toString()
        const proyectoDeTarea = await Proyecto.findById({ _id: proyectoIdDeTarea })
        const esElCreador = req.usuario.id === proyectoDeTarea.creador.toString()
        if (!esElCreador) {
            return res.json({ message: "No tienes acceso aqui :)" })
        }

        //Actualizar la tarea
        req.body.nombre ? tareaNueva.nombre = req.body.nombre : null
        tareaNueva.estado = req.body.estado

        const tareaActualizada = await Tarea.findByIdAndUpdate(
            { _id: req.params.id },
            { $set: tareaNueva },
            { new: true })

        res.json(tareaActualizada)


    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error en TareaController-Actualizar tarea");
    }
}


//Eliminar una tarea
exports.eliminarTarea = async (req, res) => {

    //Revisar si hay errores
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
    }


    try {
        //Verificar si existe la tarea
        let tareaExiste = await Tarea.findById({ _id: req.params.id })
        const tareaNueva = {}
        //console.log("Tarea Existe");


        //Verificar si el que quiere modificar es el creador
        const proyectoIdDeTarea = await tareaExiste.proyecto.toString()
        const proyectoDeTarea = await Proyecto.findById({ _id: proyectoIdDeTarea })
        const esElCreador = req.usuario.id === proyectoDeTarea.creador.toString()
        //.log(esElCreador);
        if (!esElCreador) {
            return res.json({ message: "No tienes acceso aqui :)" })
        }


        //Eliminar la tarea
        const tareaEliminada = await Tarea.findOneAndRemove({_id:req.params.id})
        
        res.json({ message: `Tarea: ${tareaEliminada} eliminada` });
        console.log(`Tarea: ${tareaEliminada} eliminada`);


    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error en TareaController-Actualizar tarea");
    }
}