const Usuario = require('../models/Usuario')
const bcryptjs = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

exports.crearUsuario = async (req, res) => {

    //Revisar si hay errores
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() })
    }

    //Extraer email para ver si esta repetido
    const { email, password } = req.body

    //Se recomienda usar un try catch
    try {

        //Verificar si es que ya hay un usuario con el mismo email
        let usuario = await Usuario.findOne({ email })
        if (usuario) {
            console.log('Ya existe un usuario con ese email');
            return res.status(400).json({ message: 'Ya existe un usuario con ese email' })
        }

        //Crea el nuevo usuario
        usuario = new Usuario(req.body)

        //Crear y firmar el jwt
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


        //Hashear el password
        //salt nos permite generar 2hash dif aunque la pass sea la misma
        const salt = await bcryptjs.genSalt()
        usuario.password = await bcryptjs.hash(password, salt)


        //Guarda el nuevo usuario
        await usuario.save()

        //Mensaje de confirmacion
        res.json({ message: 'Usuario creado correctamente' })
    } catch (error) {
        console.log(error);
        res.status(400).send("Hubo un error")
    }
}