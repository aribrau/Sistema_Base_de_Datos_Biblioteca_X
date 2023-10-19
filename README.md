Aplicación para el sistema de registro de usuarios y prestamo de libros de una biblioteca. Ejercicio para el Bootcamp Fullstack Javascript Developer de Talento Digital Sence Chile. 

Tecnologías:

Javascript, MySql, Node Express, Sequelize, bcrypt

Para la simulación de peticiones al servidor use Postman.

Se desarrolló un modelo Entidad-Relación para la construcción de la base de datos y se usó el Modelo Vista Controlador como modelo para la aplicación.

1. En la consola npm install para instalar los paquetes necesarios.
2. npm run dev para iniciar el servidor.

Rutas:

/user/create-user  (crea un nuevo usuario)

/author/create-author  (registra un nuevo autor en la base de datos)
/author/get-author-born-before-1970  (recupera de la BD autores nacidos antes de 1970)

/book/create-book (registra un nuevo libro)
/book/get-books-under-300p (recupera los libros con menos de 300 paginas)

/book-author/create-book-author (asocia un libro con un autor)

/loan/create-loan (crear un nuevo préstamo)
/loan/get-most-requested-book (obtener el libro más prestado)
/loan/get-all-loans (obtener el historial de préstamos)
/loan/get-late-fees (obtener préstamos atrasados y calcular multa)