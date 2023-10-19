import {Book} from '../model/book.js'

//controlador que crea un Libro
export const createBook = async (req, res) =>{
    let response = {
        msg:'book creation',
        error: null,
        data: null
    };
    const title = req.body.title;
    const pag_number = req.body.pag_number;
    const isbn = req.body.isbn;    
    if(title && pag_number && isbn){
        const book = new Book(null, title, pag_number, isbn)
        console.log('book: ', book)
        const model_result = await book.createBook();
        console.log(model_result)
        if(model_result != null) response.data = model_result;
        else response.error = 'Error trying to create book'
    } else {
        response.error = "Missing required parameters";
    }
    res.send(response);
};
//controlador para obtener la lista de libros con menos de 300 páginas
export const getBooksUnder300Pages = async (req, res) => {
    let response = {
        msg:'get books under 300 pag',
        error: null,
        data: null
    };
    try {
        const book = new Book();
        const model_result = await book.getBooksUnder300Pages();
        console.log('resultado: ', model_result)
        if(model_result != null){
            if(model_result.length == 0){
                response.error = 'There is no books under 300 pages in database'
            }
            response.data = model_result;
        }
        else{
            response.error = 'Error trying to get the books'
        }
        res.status(200).send(response);
    } catch (error){
        response.error = 'Server Internal Error';
        res.status(500).send(response)
    }
}



