const express = require('express');
const router = express.Router();
const ctrlUsers = require('../controllers/users');

// Definir las rutas para las acciones (CRUD) sobre users
router
    .route('/users')
    .post(ctrlUsers.userCreate)
    .get(ctrlUsers.userList);

router
    .route('/users/:userid')
    .get(ctrlUsers.userRead)
    .put(ctrlUsers.userUpdate)
    .delete(ctrlUsers.userDelete);

router
    .route('/search/:name')
    .get(ctrlUsers.userFindName);

module.exports = router;