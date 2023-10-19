import Sequelize from 'sequelize'
import db from '../utils/db.js'
import {userModel} from './user.js'
import {bookModel} from './book.js';

//clase Loan (Préstamo de libros)
class Loan {
    constructor(id_loan, id_user, id_book, loan_start_date, expected_return_date, return_date){
        this.id_loan = id_loan;
        this.id_user = id_user;
        this.id_book = id_book;
        this.loan_start_date = loan_start_date;
        this.expected_return_date = expected_return_date;
        this.return_date = return_date; 
    };
    //función que crea un nuevo préstamo
    createLoan = async () =>{
        try {
            await loanModel.sync();
            const loan_created =  await loanModel.create(this);
            if(loan_created) return loan_created.dataValues;
            else return false;
        } catch (error) {
            console.log('create loan error: ', error);
        }
    };
    //función para obtener el libro más prestado
    getMostRequestedBook = async () => {
        try {
            await loanModel.sync();
            const result = await loanModel.findAll({
                attributes: [
                'Loan.id_book', 
                [Sequelize.fn('COUNT', Sequelize.col('Loan.id_book')), 'num_loans'], 
                [Sequelize.col('Book.title'), 'Book.title'], 
                ],
                include: [
                    {
                        model: bookModel,
                        attributes: [], 
                    as: 'Book', 
                    },
                ],
                group: ['Loan.id_book', 'Book.title'], 
                order: [[Sequelize.literal('num_loans'), 'DESC']],
                limit: 1,
                raw: true,
            });
            const mostRequestedBook = result[0];
            return mostRequestedBook;
        } catch (error) {
            console.log('get most requested book error: ', error);
        };
    };
    // Obtiene el historial de préstamos, además se incluye el nombre y apellido del usuario y el titulo del libro prestado
    getAllLoans = async () => {
        try {
            await loanModel.sync();
            return await loanModel.findAll({
                include: [
                    {   
                        model: userModel, // llamamos a userModel importado arriba
                        attributes: ['name', 'lastname'], // le decimos que atributos queremos que nos devuelva de la tabla user
                    },
                    {
                        model: bookModel, // llamamos a bookModel importado arriba
                        attributes: ['title'], // le decimos los atributos que queremos de la tabla books, en este caso el título
                    }
                ]
            });
        } catch (error) {
            console.log('getall loan error: ', error)
        };
    };
    //función para actualizar un préstamo
    updateLoan = async () =>{
        try {
            await loanModel.sync();
            
            const loan_updated =  await loanModel.update(this,{where:{id:this.id}});
            if(loan_updated.length > 0) return true;
            else return false;

        } catch (error) {
            console.log('update loan  error: ', error);
        }
    }
    //función para borrar un préstamo del historial
    deleteLoan = async () =>{
            try {
                await loanModel.sync();
                console.log('id',this);
                const loan_deleted = await loanModel.destroy({where:{id:this.id}});
                if(loan_deleted > 0) return true;
                else return false;
            } catch (error) {
                console.log('delete loan  error: ', error);
            }
        };
};
//modelo Préstamo
const loanModel = db.define('Loan', {
    id_loan_book:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement:true,
    },
    id_user:{
        type:Sequelize.INTEGER,
        allowNull: false,
    },
    id_book: {
        type:Sequelize.INTEGER,
        allowNull: false,
    },
    loan_start_date:{
        type:Sequelize.DATE,
        allowNull: false,
    },
    expected_return_date:{
        type:Sequelize.DATE,
        allowNull: false,
    },
    return_date:{
        type:Sequelize.DATE,
        allowNull: false,
    }   
});
//asosiaciones de las tablas:

//relación muchos a muchos entre el "userModel" y el "bookModel". Un usuario puede relacionarse con muchos libros y muchos libros pueden relacionarse con muchos usuarios. "through:loanModel" indica que esta relación va a ser manejada por la tabla "loanModel" que actúa como tabla intermedia. "foreignKey: 'id_user'", nos dice que la columna o campo que se usa como clave foránea en la tabla intermedia para relacionar con el modelo "userModel" es "id_user".
userModel.belongsToMany(bookModel, { through: loanModel, foreignKey: 'id_user' });

//se establece la relación muchos a muchos entre "bookModel" y "userModel". Similar a la anterior salvo que en este caso, en la tabla intermedia "loanModel" se usa el campo "id_book" como clave foránea para relacionar con el modelo "bookModel"
bookModel.belongsToMany(userModel, { through: loanModel, foreignKey: 'id_book' });


//establece una relación "pertenece a" o "uno a uno" entre un préstamo "loanModel" y un usuario "userModel". Cada registro en préstamo "loanModel" estará a sociado con un registro de usuario "userModel". "foreignKey: 'id_user'" indica que en la tabla de préstamos, la columna "id_user" se usa como clave foránea para relacionar con el modelo "userModel". "targetKey: 'id_user'" indica que la clave primaria "id_user" en "userModel" se usará para establecer la relación.
loanModel.belongsTo(userModel, { foreignKey: 'id_user', targetKey: 'id_user' });

//relacion "uno a uno" entre "loanModel" y "bookModel". Similar a la anterior, pero en este caso el campo "id_book en "loanModel" se usará coomo clave foránea para relacionar con "bookModel" y "id_book" de la tabla "nookModel" es la clave primaria que se usa para establecer la relación.
loanModel.belongsTo(bookModel, { foreignKey: 'id_book', targetKey: 'id_book' });

export {Loan, loanModel};