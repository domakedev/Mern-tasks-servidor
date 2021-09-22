const mongoose = require('mongoose')

require('dotenv').config({ path: 'variables.env' })

const conectarDB = async () => {
    try {
        //(url a donde se va a conectar, objeto de configuracion)
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useFindAndModify: false
        })

        console.log("Se conecto a la DB");
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

module.exports = conectarDB