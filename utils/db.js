//configuración conexion bd con sequelize
import {Sequelize} from 'sequelize';
//importacion del modulo dotenv para utilizar las variables de entorno
import dotenv from 'dotenv';

dotenv.config();
// se extraen las variables de entorno asignandolas a una contaste para su uso en la configuración
const {DB_NAME, DB_USER, DB_PASSWORD, DB_HOST} = process.env;

const db = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'mysql'
});

export default db;