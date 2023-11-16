const Usuario = require('../models/Usuario')
const bcryptjs = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

exports.autenticarUsuario = async (req, res) => {

    //Revisar si hay errores
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() })
    }

    //Extraer info de Usuario
    const { email, password } = req.body

    try {
        //Revisar que sea un usuario registrado por el email
        let usuario = await Usuario.findOne({ email })
        if (!usuario) {
            return res.status(404).json({ message: "No existe el usuario" })
        }

        //Si pasa lo anterior entonces validar pass
        const password2 = await bcryptjs.compare(password, usuario.password)
        if (!password2) {
            return res.status(400).json({ message: "Password incorrecto" })
        }

        //si todo es correcto, crear y firmar el jwt
        const payload = {
            usuario: {
                id: usuario.id
            }
        }

        //Firmar el JWT
        jwt.sign(payload, process.env.PALABRA_SECRETA, {
            expiresIn: 3600000 // 1 hora en ms
        }, (error, token) => {
            if (error) throw error
            res.json({ tokencito: token })
        })

    } catch (error) {

    }
}


//Obtiene que usuario esta autenticado
exports.usuarioAutenticado = async (req, res) => {

    try {
        //Con select le decimos que no queremos que nos regrese el password, por seguridad.
        const usuario = await Usuario.findById(req.usuario.id).select('-password')
        res.json({ usuario })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ mensaje: "Hubo un error en usuarioAutenticado" })
    }
}