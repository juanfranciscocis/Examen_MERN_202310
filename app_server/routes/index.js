// Desarrollo web 3 - Examen de medio semestre - 202310
const express = require('express');
const router = express.Router();
const { renderIndex, buscarUsuario, addUsers,renderUsersAdd, renderUsersUpdate } = require('../controllers/users');

/* GET home page. */
router.get('/',renderIndex);

/* GET users add page. */
router.route('/users_add')
    .get(renderUsersAdd)
    .post(addUsers);


/* GET users update page. */
router.route('/users_update')
    .get(renderUsersUpdate)
    .post(buscarUsuario);


module.exports = router;