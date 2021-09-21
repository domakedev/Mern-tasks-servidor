//Rutas para autenticas usuarios
const express = require('express');
//Importamos express validator
const { check } = require('express-validator')
//Importamos el auth controler
const authControler = require('../controllers/authControler');
const auth = require('../middleware/auth');


//Importamos express porque express tiene el routing
//en router estara todo lo relacionado a routing
const router = express.Router();

//Iniciar sesion
//Entrar a /auth, lo envia a : api/auth
router.post('/',
    //Aregamos nuestras reglas de validacion

    authControler.autenticarUsuario
)


//Obtiene el usuario autenticado
router.get('/',
    auth,
    authControler.usuarioAutenticado
)

module.exports = router;
