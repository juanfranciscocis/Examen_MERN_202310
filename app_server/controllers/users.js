// Desarrollo web 3 - Examen de medio semestre - 202310


// controllers
const request = require('request');
// definir los URL's para los ambientes de desarrollo y producción
const apiOptions = {
    server: 'http://localhost:3000/'// server local - desarrollo
};
if (process.env.NODE_ENV === 'production') {
    apiOptions.server = 'https://examen-juan-francisco-cisneros.onrender.com'; // server heroku - producción
}


const addUsers = (req, res, next) => {
    const path = 'api/users/';
    const postdata = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        direccion: req.body.direccion,
        identificacion: req.body.identificacion,
        edad: req.body.edad,
        telefono: req.body.telefono,
        materias: {
            tipo: req.body.tipo,
            nombres: req.body.nombres
        },
        carrera: req.body.carrera,
        fecha: req.body.creado
    };
    console.log(postdata);
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'POST',
        json: postdata
    };
    request(
        requestOptions,
        (err, response, body) => {
            if (response.statusCode === 201) {
                console.log('Status: ', response.statusCode);
                res.redirect('/users_add');
            } else {
                console.log('Status: ', response.statusCode);
                res.render('error', {
                    mensaje: 'Error al agregar usuario'
                })
            }
        });
}


const buscarUsuario = (req, res, next) => {
    const path = `api/search/${req.body.textoBuscar}`;
    console.log('Buscar usuario con nombre: ', req.body.textoBuscar);
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'GET',
        json: {}
    };
    request(
        requestOptions,
        (err, response, body) => {
            if (response.statusCode === 200) {
                console.log('Status: ', response.statusCode);
                console.log(body);
                //redireccionar a la vista de actualizar
                res.render('users_update', {
                    title: 'Actualizar usuario',
                    materia: 'Desarrollo web 3',
                    examen: 'Examen de medio semestre.',
                    nombre: next.nombre,
                    apellido: next.apellido,
                    direccion: next.direccion,
                    identificacion: next.identificacion,
                    edad: next.edad,
                    telefono: next.telefono,
                    tipo: next.tipo,
                    nombres: next.nombres,
                    carrera: next.carrera,
                    creado: next.creado,
                });
            } else {
                console.log('Status: ', response.statusCode);
                res.render('error', {
                    mensaje: 'Error al buscar usuario'
                })
            }
        });

}




const renderUsersAdd = (req, res, next) => {
    res.render('users_add', {
        title: 'Agregar usuario',
        materia: 'Desarrollo web 3',
        examen: 'Examen de medio semestre.'
    });
}

const renderUsersUpdate = (req, res, next) => {
    res.render('users_update', {
        title: 'Actualizar usuario',
        materia: 'Desarrollo web 3',
        examen: 'Examen de medio semestre.',
        nombre: next.nombre,
        apellido: next.apellido,
        direccion: next.direccion,
        identificacion: next.identificacion,
        edad: next.edad,
        telefono: next.telefono,
        tipo: next.tipo,
        nombres: next.nombres,
        carrera: next.carrera,
        creado: next.creado,
    });
}

const renderIndex = (req, res, next) => {
    res.render('index', {
        title: 'Examen No. 1',
        materia: 'Desarrollo web 3',
        examen: 'Examen de medio semestre.'
    });
}


module.exports = {
    renderIndex,
    renderUsersAdd,
    renderUsersUpdate,
    addUsers,
    buscarUsuario
}