import Sequelize from 'sequelize';
import db from '../utils/db.js';

//modelo Tipo de Autor
const authorTypeModel = db.define('AuthorType', {
    id_author_type: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    author_type: {
        type: Sequelize.STRING,
        allowNull: true,
    }
});

export { authorTypeModel };

