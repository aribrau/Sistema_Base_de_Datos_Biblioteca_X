import Sequelize from 'sequelize';
import db from '../utils/db.js';
import { authorModel } from './author.js';
import { bookModel } from './book.js';
import { authorTypeModel } from './authorType.js';

//clase/relación Libro-Autor
class BookAuthor {
    constructor(id_book_author, id_author, id_book, id_author_type) {
        this.id_book_author = id_book_author;
        this.id_author = id_author;
        this.id_book = id_book;
        this.id_author_type = id_author_type;
    }
    //función para crear una relación libro-autor
    async createBookAuthor() {
        try {
            await bookAuthorModel.sync();
            const created_bookAuthor = await bookAuthorModel.create(this);
            if (created_bookAuthor) {
                console.log('book author register:', created_bookAuthor);
                return created_bookAuthor.dataValues;
            } else {
                return false;
            }
        } catch (error) {
            console.log('insert book author error:', error);
            return false;
        }
    }
}
//modelo libro-autor
const bookAuthorModel = db.define('BookAuthor', {
    id_book_author: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    id_author: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'authors',
            key: 'id_author',
        },
    },
    id_book: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'books',
            key: 'id_book',
        },
    },
    id_author_type: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'author_types',
            key: 'id_author_type',
        },
    },
});

//relación "muchos a muchos" entre Autor y Libro. Un autor puede pertenecer a varios libros y un libro a varios autores. "id_author" se usa como clave foránea en la tabla libro-autor que es la tabla intermedia que relaciona un autor con un libro
authorModel.belongsToMany(bookModel, { through: bookAuthorModel, foreignKey: 'id_author' });
//establece la relación "muchos a muchos" entre libro y autor. La relación se maneja a través de la tabla intermedia "bookAuthorModel" y se usa el campo "id_book" como clave foránea en la tabla libro-autor.
bookModel.belongsToMany(authorModel, { through: bookAuthorModel, foreignKey: 'id_book' });


//relación "uno a uno" entre la tabla libro-autor y la tabla autor. Un registro en "bookAuthorModel" (tabla intermedia) está asociado a un registro en la tabla "authorModel". "id_author" es la clave foránea de la tabla libro-autor y hace relación con "id_author" que es la clave primaria de la tabla autor.
bookAuthorModel.belongsTo(authorModel, { foreignKey: 'id_author', targetKey: 'id_author' });
//relación "uno a uno" entre la tabla Libro-Autor y la tabla Libro. Un registro en "bookAuthorModel" (tabla intermedia) está asociado a un registro en la tabla "bookModel". "id_book" es la clave foránea de la tabla libro-autor y hace relación con "id_bookr" que es la clave primaria de la tabla Libro.
bookAuthorModel.belongsTo(bookModel, { foreignKey: 'id_book', targetKey: 'id_book' });
//relación "uno a uno" entre la tabla Libro-Autor y la tabla tipo autor. Un registro en "bookAuthorModel" (tabla intermedia) está asociado a un registro en la tabla "authorTypeModel". "id_author_type" es la clave foránea de la tabla libro-autor y hace relación con "id_author_type" que es la clave primaria de la tabla Libro.
bookAuthorModel.belongsTo(authorTypeModel, { foreignKey: 'id_author_type', targetKey: 'id_author_type' });

export { BookAuthor, bookAuthorModel };
