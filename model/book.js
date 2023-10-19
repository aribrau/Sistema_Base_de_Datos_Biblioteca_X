import {Sequelize, Op} from 'sequelize'
import db from '../utils/db.js'

//clase Libro
class Book {

    constructor(id_book, title, pag_number, isbn){
        this.id_book = id_book;
        this.title = title;
        this.pag_number = pag_number;
        this.isbn = isbn;
    }
    //crear un nuevo registro en la tabla Libro
    createBook = async () =>{
        try {
            await bookModel.sync();
            const book_created =  await bookModel.create(this);
            if(book_created) return book_created.dataValues;
            else return false;
        } catch (error) {
            console.log('create book error: ', error);
        }
    };
    //función para consultar los libros que tienen menos de 300 páginas
    getBooksUnder300Pages = async () => {
        try {
            await bookModel.sync();
            return await bookModel.findAll({
                where: {
                    pag_number: { [Op.lt]: 300 }// "Op.lt" es el signo menor que (<), se importa "OP" que hace referencia a las operaciones, arriba junto con Sequelize
                }
            });
        } catch (error) {
            console.log('get books under 300 pages error: ', error);
        }
    }
    //obtener todos los libros registrados    
    getAllBooks = async () =>{
        try {
            await bookModel.sync();
            return await bookModel.findAll();
        } catch (error) {
            console.log('getall book error: ', error)
        }
    }
    //actualizar el registro de un libro
    updateBook = async () =>{
        try {
            await bookModel.sync();
            
            const book_updated =  await bookModel.update(this,{where:{id:this.id}});
            if(book_updated.length > 0) return true;
            else return false;

        } catch (error) {
            console.log('update book error: ', error);
        }
    }
    //eliminar un registro de libro
    deleteBook = async () =>{
            try {
                await bookModel.sync();
                console.log('id',this);
                const book_deleted = await bookModel.destroy({where:{id:this.id}});
                if(book_deleted > 0) return true;
                else return false;
            } catch (error) {
                console.log('delete book error: ', error);
            }
        };
}
//modelo Libro
const bookModel = db.define('Book', {
    id_book:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement:true,
    },
    title:{
        type:Sequelize.STRING,
        allowNull: true,
    },
    pag_number:{
        type:Sequelize.INTEGER,
        allowNull: true,
    },
    isbn:{
        type:Sequelize.STRING,
        allowNull: true,
    }
});


export {Book, bookModel};