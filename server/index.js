//importar Express
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes');
const configs = require('./config');

require('dotenv').config({ path: 'variables.env' });

// db.authenticate()
//     .then(() => console.log('DB Conectada!!!'))
//     .catch(error => console.log(error))

//Conf. Express
const app = express();

//Habilitar Pug
app.set('view engine', 'pug');

//Añadir las vistas
app.set('views', path.join(__dirname, './views'));

//Cargar una carpeta estatic llamada public
app.use(express.static('public'));

//Validar Desarrollo o Produccion
const config = configs[app.get('env')];

//Creamos la variable para el sitio Web
app.locals.titulo = config.nombresitio;

//Muestra el año actual y genera la ruta
app.use((req, res, next) =>
{
    const fecha = new Date();

    res.locals.fechaActual = fecha.getFullYear();  
    res.locals.ruta = req.path;

    return next();
})

//Ejecutamos el bodyparser
app.use(bodyParser.urlencoded({ extended: true }));

//Cargar Rutas
app.use('/', routes());

//Puerto y Host para la App
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;

app.listen(port, host, () =>
{
    console.log('El servidor esta funcionando...');    
});