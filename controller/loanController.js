import {Loan} from '../model/loan.js';

//controlador para crear un nuevo registro en la tabla Préstamo
export const createLoan = async (req, res) =>{
    let response = {
        msg:'loan creation',
        error: null,
        data: null
    };
    const id_user = req.body.id_user;
    const id_book = req.body.id_book;
    const loan_start_date = req.body.loan_start_date;  
    const expected_return_date = req.body.expected_return_date;
    const return_date = req.body.return_date;  
    if(id_user && id_book && loan_start_date && expected_return_date && return_date){
        const loan = new Loan(null, id_user, id_book, loan_start_date, expected_return_date, return_date)
        console.log('loan: ', loan)
        const model_result = await loan.createLoan();
        console.log(model_result)
        if(model_result != null) response.data = model_result;
        else response.error = 'Error trying to create loan'
    } else {
        response.error = "Missing required parameters";
    }
    res.send(response);
};
//controlador para obtener el libro más prestado
export const getMostRequestedBook = async (req, res) => {
    let response = {
        msg:'get most requested book',
        error: null,
        data: null
    };
    try {
        const loan = new Loan();
        const model_result = await loan.getMostRequestedBook();
        console.log('resultado: ', model_result)
        if(model_result != null){
            if(model_result.length == 0){
                response.error = 'There is no books in database'
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
//controlador que obtiene todos los préstamos de la tabla Préstamo
export const getAllLoans = async (req, res) => {
    let response = {
        msg:'get all loans',
        error: null,
        data: null
    };
    try {
        const loan = new Loan();
        const model_result = await loan.getAllLoans();
        console.log('resultado: ', model_result)
        if(model_result != null){
            //si no encuentra registros nos dice que no hay registros de préstamo en la database
            if(model_result.length == 0){
                response.error = 'There is no loans in database'
            }
            response.data = model_result;
        }
        else{
            response.error = 'Error trying to get the loans'
        }
        res.status(200).send(response);
    } catch (error){
        response.error = 'Server Internal Error';
        res.status(500).send(response)
    }
}
//controlador obtiene los prestamos atrasados, el libro prestado y el usuario que pidió el préstamo además muestra los días de atraso y calcula la multa correspondiente a esos días
export const getLateFees = async (req, res) => {
    try {
        let response = {
            msg: 'Obtener todos los préstamos con días de retraso y detalles de usuario y libro',
            error: null,
            data: [] // Inicializar data como un arreglo vacío
        };
        // Obtener los préstamos con detalles de usuario y libro
        const loan = new Loan();
        const loans = await loan.getAllLoans();
        console.log('loans', loans);
        //recorre el arreglo que trae la función "loan.getAllLoans()" y para cada registro captura las "expected_return_date" y "return_date" y las guarda en unas variables
        loans.forEach(loan => {
            //fecha esperada de devolución
            const expectedReturnDate = new Date(loan.expected_return_date);
            console.log('fecha esperada', expectedReturnDate);
            //fecha real de devolución
            const returnDate = new Date(loan.return_date);
            console.log('fecha real', returnDate);
            //aqui se calculan los dias de atraso restando las fechas
            const lateDays = Math.max(0, returnDate - expectedReturnDate) / (1000 * 60 * 60 * 24);
            console.log('dias retraso', lateDays);
            // Filtrar solo los préstamos con días de retraso
            if (lateDays > 0) {
                //se calcula el monto de la multa multiplicando el número de días de atraso * 100
                const lateFees = lateDays * 100;
                console.log('multa a pagar', lateFees);
                //luego guardamos el nombre, apellido del usuario y el titulo del libro prestado y los guardamos en unas variables
                const userName = loan.User ? loan.User.name : null;
                const userLastname = loan.User ? loan.User.lastname : null; 
                const bookName = loan.Book ? loan.Book.title : null; 
                //insertamos los datos obtenidos en la respuesta que nos da el id del préstamo, el título del libro prestado, el nombre y apellido del usuario que pidió el préstamo, los días atrasados y la multa correspondiente
                response.data.push({
                    id_loan_book: loan.id_loan_book,
                    bookName: bookName,
                    userName: userName,
                    userLastname: userLastname,
                    lateDays: lateDays,
                    lateFees: lateFees
                });
            }
        });
        // Enviar la respuesta al cliente con formato json
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};







