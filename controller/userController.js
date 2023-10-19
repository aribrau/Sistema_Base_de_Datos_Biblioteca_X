import {User} from '../model/user.js';

//controller para crear un Usuario
export const createUser = async (req, res) =>{
    let response = {
        msg:'user creation',
        error: null,
        data: null
    };
    const name = req.body.name;
    const lastname = req.body.lastname;
    const dni = req.body.dni; 
    const adress = req.body.adress;
    const phone_number = req.body.phone_number;   
    if(name && lastname && dni && adress && phone_number){
        const user = new User(null, name, lastname, dni, adress, phone_number)
        console.log('user: ', user)
        const model_result = await user.createUser();
        console.log(model_result)
        if(model_result != null) response.data = model_result;
        else response.error = 'Error trying to create user'
    } else {
        response.error = "Missing required parameters";
    }
    res.send(response);
};