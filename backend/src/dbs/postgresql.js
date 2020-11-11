require('dotenv').config() //Permite obtener datos de variables de entorno .env

const { Pool, Connection } = require('pg')

/*Todos los datos referentes a la Base de Datos estan en la variable de entorno .env */
const config = {
    user: 'postgres',
    password: '1234',
    database: 'red_social',
    host: 'localhost',
    port: '5432'
};

const conexion_pg = new Pool(config);
conexion_pg.connect()
    .then(db_pg => console.log('Conexión exitosa con base de datos PostgreSQL'))
    .catch(err => console.log('Error al conectar con base de datos PostgreSQL ' + err));

module.exports = conexion_pg;