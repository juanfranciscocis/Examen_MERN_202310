// Desarrollo web 3 - Examen de medio semestre - 202310
const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Examen No. 1',
        materia: 'Desarrollo web 3',
        examen: 'Examen de medio semestre.'
    });
});

module.exports = router;