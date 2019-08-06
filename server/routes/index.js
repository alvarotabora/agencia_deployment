const express = require('express');
const router = express.Router();

//Controladores
const nosotrosController = require('../controllers/nosotrosController');
const homeController = require('../controllers/homeController');
const viajesController = require('../controllers/viajesController');
const testmonialesController = require('../controllers/testimonialesController');

module.exports = function ()
{
    router.get('/', homeController.consultasHomepage);
    router.get('/nosotros', nosotrosController.infoNosotros);
    router.get('/viajes', viajesController.mostrarViajes);    
    router.get('/viajes/:id', viajesController.mostrarViaje);
    router.get('/testimoniales', testmonialesController.mostrarTestimoniales);

    router.post('/testimoniales', testmonialesController.agregarTestimonial);

    return router;
}