import Sequelize from 'sequelize'
import db from '../utils/db.js'

//declaramos la clase User con su constructor y sus respectivas funciones o métodos
class User {

    constructor(id_user, name, lastname, dni, adress, phone_number){
        this.id_user = id_user;
        this.name = name;
        this.lastname = lastname;
        this.dni = dni;
        this.adress = adress; 
        this.phone_number = phone_number;
    }
    //función que crea un nuevo usuario
    createUser = async () =>{
        try {
            await userModel.sync();
            const user_created =  await userModel.create(this);
            if(user_created) return user_created.dataValues;
            else return false;
        } catch (error) {
            console.log('Create user error: ', error);
        }
    };
    //función que obtiene todos los usuarios
    getAllUsers = async () =>{
        try {
            await userModel.sync();
            return await userModel.findAll();
        } catch (error) {
            console.log('Get all user error: ', error)
        }
    }
    //función que actualiza los datos de un usuario
    updateUser = async () =>{
        try {
            await userModel.sync();
            
            const user_updated =  await userModel.update(this,{where:{id:this.id}});
            if(user_updated.length > 0) return true;
            else return false;
        } catch (error) {
            console.log('Update user error: ', error);
        }
    }
    //función que elimina un usuario
    deleteUser = async () =>{
            try {
                await userModel.sync();
                console.log('id',this);
                const user_deleted = await userModel.destroy({where:{id:this.id}});
                if(user_deleted > 0) return true;
                else return false;
            } catch (error) {
                console.log('Delete user error: ', error);
            }
        };
}
//modelo User
const userModel = db.define('User', {
    id_user:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement:true,
    },
    name:{
        type:Sequelize.STRING,
        allowNull: false,
    },
    lastname:{
        type:Sequelize.STRING,
        allowNull: false,
    },
    dni: {
        type:Sequelize.STRING,
        allowNull: false,
    },
    adress:{
        type:Sequelize.STRING,
        allowNull: false,
    },
    phone_number:{
        type:Sequelize.INTEGER,
        allowNull: false,
    }   
});

export {User, userModel};