//Importamos el modelo, nos permitira usar mongoose
const Proyecto = require("../models/Proyecto");
//Importamos el check validator
const { validationResult } = require("express-validator");

exports.crearProyecto = async (req, res) => {
  //Revisar si hay errores
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }

  try {
    //Creamos el proyecto
    const proyecto = new Proyecto(req.body);

    //Guardamos tambien el creador
    proyecto.creador = req.usuario.id;
    proyecto.save();
    res.json(proyecto);
  } catch (e) {
    console.log(e);
    res.status(500).send("Hubo un error en proyectoController");
  }
};

//Obtener todos los proyectos
exports.ObtenerProyectos = async (req, res) => {
  try {
    const proyectos = await Proyecto.find({ creador: req.usuario.id })//.sort({ fechaCreacion: -1, });
    res.json(proyectos);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error en proyectoController 500");
  }
};

//Actualizar el proyecto seleccionado
exports.actualizarProyecto = async (req, res) => {
  //Revisar si hay errores, con ayuda del check en el router
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }

  //Extraer informacion del proyecto
  const { nombre } = req.body;
  const nuevoProyecto = {};

  if (nombre) {
    nuevoProyecto.nombre = nombre;
    //nuevoProyecto.fechaCreacion= Date.now()
    console.log("He aqui el nuevo proyecto", nuevoProyecto);
  }

  try {
    //Encontrar si existe el id
    console.log(req.params.id);
    let proyecto = await Proyecto.findById(req.params.id);

    //Verificar si el proyecto existe o no
    if (proyecto === null || proyecto === undefined || !proyecto) {
      return res.status(404).json({ message: "El proyecto no existe." });
    }

    //Verificar el creador del proyecto
    //toString(), saca el Id de los parentesis del Object
    const esElCreador = proyecto.creador.toString() == req.usuario.id;
    console.log(esElCreador);

    if (!esElCreador) {
      return res.status(404).json({ message: "No tienes autorizacion!" });
    }

    //Actualizar proyecto
    //findOneAndUpdate: solo actualiza los elementos ya existentes, no añade nuevos elementos aunque lo mandemos aqui en el TRY.
    proyecto = await Proyecto.findOneAndUpdate(
      { _id: req.params.id },
      { $set: nuevoProyecto },
      { new: true }
    );
    console.log("Proyecto actualizado", proyecto);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error en el servidor");
  }
};

//Eliminar el proyecto seleccionado
exports.eliminarProyecto = async (req, res) => {
  try {
    //Encontrar si existe el id
    console.log(req.params.id);
    let proyecto = await Proyecto.findById(req.params.id);
    let nombreDelProyectoAEliminar = proyecto.nombre;

    //Verificar si el proyecto existe o no
    if (proyecto === null || proyecto === undefined || !proyecto) {
      return res.status(404).json({ message: "El proyecto no existe." });
    }

    //Verificar el creador del proyecto
    //toString(), saca el Id de los parentesis del Object
    const esElCreador = proyecto.creador.toString() == req.usuario.id;
    console.log(esElCreador);

    if (!esElCreador) {
      return res.status(404).json({ message: "No tienes autorizacion!" });
    }

    //Eliminar proyecto
    proyecto = await Proyecto.findOneAndRemove({ _id: req.params.id });
    res.json({ message: `Proyecto: ${nombreDelProyectoAEliminar} eliminado` });
    console.log(`Proyecto: ${nombreDelProyectoAEliminar} eliminado`);


  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error en el servidor en eliminarProyecto");
  }
};
