require('dotenv').config();

const mongoose = require('mongoose')

const app = require('./app')

mongoose.connect(process.env.MONGO_URL)

    .then(() => {
        console.log("CONECTADO A LA DB")

        app.listen(process.env.SERVER_PORT, () => {
            console.log("SERVIDOR FUNCIONANDO EN PUERTO 3000")
        })
    })

    .catch(error => console.log(error))