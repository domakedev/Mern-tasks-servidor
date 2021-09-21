const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    //Leer el token del Header
    const token = req.header("x-auth-token");

    console.log(token);
    //Revisar si no hay token
    if (!token) {
        return res.status(401).json({ message: "No hay token, permiso no valido" });
    }

    //Validar el token
    try {
        const cifrado = jwt.verify(token, process.env.PALABRA_SECRETA);
        console.log(cifrado);
        req.usuario = cifrado.usuario;
        next();
    } catch (error) {
        console.log(error);
        //401: mensaje de no autorizacion
        res.status(401).json({ message: "Token no valido" });
    }
};
