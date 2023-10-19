import {Author} from '../model/author.js';

//controler para crear un registro nuevo en la tabla Autor
export const createAuthor = async (req, res) =>{
    let response = {
        msg:'author creation',
        error: null,
        data: null
    };
    const name = req.body.name;
    const lastname = req.body.lastname;
    const birth_date = req.body.birth_date; 
    const death_date = req.body.death_date;   
    if(name && lastname && birth_date){
        const author = death_date ? new Author(null, name, lastname, birth_date, death_date) : new Author(null, name, lastname, birth_date);
        console.log('author: ', author)
        const model_result = await author.createAuthor();
        console.log(model_result)
        if(model_result != null) response.data = model_result;
        else response.error = 'Error trying to create author'
    } else {
        response.error = "Missing required parameters";
    }
    res.send(response);
}
//controlador para obtener los autores nacidos después de 1970
export const getAuthorsBornAfter1970 = async (req, res) => {
    let response = {
        msg:'get author born before 1970',
        error: null,
        data: null
    };
    try {
        const author = new Author();
        const model_result = await author.getAuthorsBornAfter1970();
        console.log('resultado: ', model_result)
        if(model_result != null){
            if(model_result.length == 0){
                response.error = 'There is no authors born before 1970 in database'
            }
            response.data = model_result;
        }
        else{
            response.error = 'Error trying to get the authors'
        }
        res.status(200).send(response);
    } catch (error){
        response.error = 'Server Internal Error';
        res.status(500).send(response)
    }
}

