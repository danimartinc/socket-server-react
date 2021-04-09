//Comunicacion Full-Duplex entre Backend y Frontend

const Server = require("./models/server");
//Defino las variables de entorno a nivel global en mi app
require('dotenv').config();


//Creo una instancia del Server
const server = new Server();

//Inicializo todo el Servidor
server.execute();