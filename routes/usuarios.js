//Rutas para crear usuarios
const express = require('express');
//Importar controller
const usuarioControler = require('../controllers/usuarioControler')
//Importamos express validator
const { check } = require('express-validator')

//Importamos express porque express tiene el routing
//en router estara todo lo relacionado a routing
const router = express.Router();

//Crea un usuario, lo envia a : api/usuarios
router.post('/',
    //Aregamos nuestras reglas de validacion
    [
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('email','Agrega un email valido').isEmail(),
        check('password','El password debe ser minimo de 6 caracteres').isLength({min:6})
        
    ],
    usuarioControler.crearUsuario
)

module.exports = router;
