const express = require('express');
const config = require('./config/jwt');
const login = require('./routes/login');
const signUp = require('./routes/signup');
const multer = require('multer');
const cors =require('cors');

const app = express();
const port = process.env.PORT || 3000;

////////////////7
app.use(cors());
app.use(multer().array());
/////////////////

app.use(express.json());
app.set("key", config.key);

app.use('/',login);
app.use('/',signUp);

//Función callback -> función que se ejecuta como respuesta a un evento o acción
app.listen(port, () =>{
    console.log(`Servidor iniciado en el puerto ${port}`);
})


///////////////////////////////////// login -> removed function