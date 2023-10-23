// esquema de la colección usuarios - dw3_202310_users

const mongoose = require('mongoose');

const usuariosSchema = new mongoose.Schema({
    nombre: {
        type: String,
        require: true
    },
    apellido: {
        type: String,
        require: true
    },
    identificacion: {
        type: Number,
        require: true
    },
    direccion: {
        type: String
    },
    edad: {
        type: Number,
        'default': 1,
        min: 1,
        max: 100,
    },
    telefono: {
        type: Number,
        'default': 9999999999
    },
    materias: {
        tipo: {
            type: String,
            enum: ['Presencial','Virtual']
        },
        nombres: [String]
    },
    carrera: {
        type: String
    },
    fecha: {
        type: Date,
        'default': Date.now
    }
});

const Usuario = new mongoose.model('user', usuariosSchema);

const user = new Usuario({
    nombre: 'Juan',
    apellido: 'Perez',
    identificacion: 1236547890,
    direccion: 'Quito',
    telefono: 9876543210,
    edad: 22,
    materias: {
        tipo: 'Presencial',
        nombres: ['DW1', 'DW2', 'DW3']
    },
    carrera: 'Medios Interactivos'
});

// user.save();
