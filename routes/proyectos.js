const express = require("express");
const router = express.Router();
//Importar el controler de proyectos
const proyectoControler = require("../controllers/proyectoControler");
//Importar el middleware creado
const auth = require("../middleware/auth");
//Importar al check de express
const { check } = require("express-validator");

//cuando envien un post a la ruta principal
router.post(
    "/",
    auth,
    [
        check("nombre", "El nombre del proyecto es obligatorio, no uses uno vacio -.-").notEmpty(),
    ],
    proyectoControler.crearProyecto
);

router.get("/",
    auth,
    proyectoControler.ObtenerProyectos
);

router.put(
    "/:id",
    auth,
    [
        check(
            "nombre",
            "El nombre del proyecto es obligatorio, no uses uno vacio -.-"
        ).notEmpty(),
    ],
    proyectoControler.actualizarProyecto
);

router.delete("/:id",
    auth,
    proyectoControler.eliminarProyecto
);

module.exports = router;
