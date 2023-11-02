const express = require("express");

const bodyParser = require('body-parser');

const app = express();

const config = require('./src/config/config');

const connection = require('./src/database/dbController')

const user_routes = require('./src/routes/userRouter')

const cors = require('cors');

connection()

app.use(bodyParser.urlencoded({extended:false}));

app.use(bodyParser.json());

app.use(cors({
    origin: '*'
}));

app.use(require('./src/controllers/authController'))

app.use('/user', user_routes)

async function init(){
    await app.listen(config.port, () => {
        console.log(`Servidor corriendo en http://localhost:${config.port}`);
    });
}

init()