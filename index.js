//Este sera el servidor




//Node aun no soporta los imports por eso se usa requiere
const express = require('express');
const conectarDB = require('./config/db')
const cors = require('cors');


//Crear el servidor con el nombre de app, con el midleware se hara mas facil...? xd
const app = express();

//Conetar a la DB
conectarDB()

//Habilitar CORS, es decir, que cliente y servidor puedan estar en diferentes dominios :2
app.use(cors());

//Habilitar express.json
app.use(express.json({ extend: true }));

//Vamos a crear el puerto de la app
//Con el nombre de PORT, porque cuando hagamos el deployment en Heroku se espera que el puerto se llame PORT
//Cliente puerto=3000, servidor=4000
//Heroku va a buscar el puerto que tengamos disponible(....process.env.PORT) y asignara el que tenga disponible
const port = process.env.port || 4000;

//Importar rutas
app.use('/api/usuarios', require('./routes/usuarios'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/proyectos', require('./routes/proyectos'))
app.use('/api/tareas', require('./routes/tareas'))

//Definir la pagina principal, sirve para verificar que el codigo esta corriendo correctamente
app.get('/', (req, res) => {
    res.send("Hola papu :v")
})

//Arrancar la app o el servidor
app.listen(port, '0.0.0.0',
    () => console.log(`El servidor esta funcionando en el puerto ${port}`)
);