const mongoose = require('mongoose');
//let dbURI = 'mongodb://localhost/dw3_202310_users'; // string de conexión
let dbURI = 'mongodb+srv://juanfrancistm2011:06012002jF_@cluster0.rdv4cdt.mongodb.net/?retryWrites=true&w=majority';
if (process.env.NODE_ENV === 'production'){
    dbURI = process.env.MONGO_URI;
}

const readLine = require('readline');

require('./esquema_users'); // definición del esquema

// escuchar el evento e windows SIGINT
if (process.platform === 'win32') {
    const rl = readLine.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.on('SIGINT', () => {
        process.emit('SIGINT'); // emitir evento
    });
}

// proceso para cerrar la conexión a MONGODB (mongoose)
const procShutdown = (msg, callback) => {
    mongoose.connection.close();
    console.log(`Mongoose se desconectó por: ${msg}`);
    callback();
};

// Señales de terminación de procesos:
// windows: SIGINT
// node: SIGUSR2
// heroku: SIGTERM

// evento node SIGUSR2 
process.once('SIGUSR2', () => {
    procShutdown('nodemon restart', () => {
        process.kill(process.pid, 'SIGUSR2');
    });
});

// evento windows SIGINT
process.on('SIGINT', () => {
    procShutdown('ended by windows', () => {
        process.exit(0);
    });
});

// evento heroku SIGTERM
process.on('SIGTERM', () => {
    procShutdown('heroku app shutdown', () => {
        process.exit(0);
    });
});

// conexión a mongodb - dw3_202310_users
mongoose.connect(dbURI, {
    family: 4, // probará IPv6, si no funciona usará IPv4
    serverSelectionTimeoutMS: 5000
}).catch(err => console.log(`Se presentó un error de conexión en MONGODB: ${dbURI}` , err));

// mensajes de los eventos de conexión
// conexión exitosa
mongoose.connection.on('connected', () => {
    console.log('Mongoose se conectó a: ', dbURI);
});

// conexión con error
mongoose.connection.on('err', () => {
    console.log('Mongoose error de conexión a: ', dbURI);
});

// desconexión 
mongoose.connection.on('disconnected', () => {
    console.log('Mongoose se desconectó a: ', dbURI);
});

// // conexión a mongodb - dw3_202310_users_log
// const dbURIlog = 'mongodb://localhost/dw3_202310_users_log';
// const logDB = mongoose.createConnection(dbURIlog, {
//     family: 4, // probará IPv6, si no funcioná usará IPv4
//     serverSelectionTimeoutMS: 5000
// });

// // mensajes de los eventos de conexión - dw3_202310_users_log
// // conexión exitosa
// mongoose.connection.on('connected', () => {
//     console.log('Mongoose se conectó a: ', dbURIlog);
// });

// // conexión con error
// mongoose.connection.on('err', () => {
//     console.log('Mongoose error de conexión a: ', dbURIlog);
// });

// // desconexión 
// mongoose.connection.on('disconnected', () => {
//     console.log('Mongoose se desconectó a: ', dbURIlog);
// });