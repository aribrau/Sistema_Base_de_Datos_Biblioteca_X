import {BookAuthor} from '../model/bookAuthor.js';

//controlador para crear un registro en la tabla Libro-Autor
export const createBookAuthor = async (req, res) =>{
    let response = {
        msg:'book author creation',
        error: null,
        data: null
    };

    const id_author = req.body.id_author;
    const id_book = req.body.id_book;
    const id_author_type = req.body.id_author_type;    

    if(id_author && id_book && id_author_type){

        const book_author = new BookAuthor(null, id_author, id_book, id_author_type)
        console.log('book_author: ', book_author)
        const model_result = await book_author.createBookAuthor();
        console.log(model_result)
        if(model_result != null) response.data = model_result;
        else response.error = 'Error trying to create book_author'

    } else {
        response.error = "Missing required parameters";
    }
    res.send(response);
};



