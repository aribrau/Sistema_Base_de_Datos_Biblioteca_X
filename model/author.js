import {Sequelize, Op} from 'sequelize'
import db from '../utils/db.js'

//clase Autor
class Author {

    constructor(id_author, name, lastname, birth_date, death_date){
        this.id_author = id_author;
        this.name = name;
        this.lastname = lastname;
        this.birth_date = birth_date; 
        this.death_date = death_date;
    }
    //función crea un nuevo registro en la tabla Autor
    async createAuthor(){
        try {
            await authorModel.sync();
            const author_created =  await authorModel.create(this);
            if(author_created) return author_created.dataValues;
            else return false;
        } catch (error) {
            console.log('create author error: ', error);
        }
    };
    //función para obtener los Autores nacidos despues de 1970
    getAuthorsBornAfter1970 = async () => {
        try {
            await authorModel.sync();
            return await authorModel.findAll({
                where: {
                    birth_date: { [Op.gt]: '1970-01-01' }//"Op.gt" es el signo mayor que (>)
                }
            });
        } catch (error) {
            console.log('get authors born before 1970 error: ', error);
        }
    }    
    //obtiene todos los autores registrados
    getAllAuthors = async () =>{
        try {
            await authorModel.sync();
            return await authorModel.findAll();
        } catch (error) {
            console.log('get all authors error: ', error)
        }
    }
    //actualizar el registro de un autor
    updateAuthor = async () =>{
        try {
            await authorModel.sync();
            
            const author_updated =  await authorModel.update(this,{where:{id:this.id}});
            if(author_updated.length > 0) return true;
            else return false;

        } catch (error) {
            console.log('update author error: ', error);
        }
    }
    //eliminar un autor
    deleteAuthor = async () =>{
            try {
                await authorModel.sync();
                console.log('id_author',this);
                const author_deleted = await authorModel.destroy({where:{id:this.id}});
                if(author_deleted > 0) return true;
                else return false;
            } catch (error) {
                console.log('delete author error: ', error);
            }
        };
}
//modelo Autor
const authorModel = db.define('Author', {
    id_author:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement:true,
    },
    name:{
        type:Sequelize.STRING,
        allowNull: false,
    },
    lastname: {
        type:Sequelize.STRING,
        allowNull: false,
    },
    birth_date:{
        type:Sequelize.DATE,
        allowNull: false,
    },
    death_date:{
        type:Sequelize.DATE,
        allowNull: true,       
    }
});

export {Author, authorModel};