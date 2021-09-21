const express = require("express");
const router = express.Router();
//Importar el controler de proyectos
const tareaControler = require("../controllers/tareaControler");
//Importar el middleware creado
const auth = require("../middleware/auth");
//Importar al check de express
const { check } = require("express-validator");

//Publicar una nueva tarea, dentro de un proyecto
router.post(
    '/',
    auth,
    [
        check("nombre", "El nombre es obligatorio").notEmpty(),
        check("proyecto", "El id del proyecto es obligatorio").notEmpty()

    ],
    tareaControler.crearTarea
);

//Extraer todas las tareas de un proyecto
router.get(
    '/',
    auth,
    [
        check("proyecto", "El id del proyecto es obligatorio").notEmpty()

    ],
    tareaControler.extraerTareas
);


//Actualizar una tarea
router.put(
    '/:id',
    auth,
    [
        //check("proyecto", "El id del proyecto es obligatorio").notEmpty()

    ],
    tareaControler.actualizarTarea
);


//Eliminar una tarea
router.delete(
    '/:id',
    auth,
    tareaControler.eliminarTarea
);


module.exports = router;
