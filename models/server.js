//Clase que centraliza el servidor Express, configuracion de los sockets
//Trabajamos Node basado en clases

//Importacion Servidor Express
const express  = require('express');
//Importacion Sevidor de Sockets
const http     = require('http');
//Importacion del Socket para su configuracion
const socketio = require('socket.io');
//Importamos el path en Express
const path     = require('path');
const cors     = require('cors');

const Socket   = require('./socket');


class Server {
    //Definimos las propiedades del Server
    constructor(){
        this.app  = express();
        //Definimo por defecto el puerto, donde se escucha al servidor
        this.port = process.env.PORT;

        //Creación del HTTP Server
        this.server = http.createServer( this.app );

        //Configuración del socket server
        //En el segundo argumento, se puede confgurar latencia, timeouts.....
        this.io = socketio( this.server, {} );
    }

    //Inicializo todos los Middlewares que se van a usar
    middlewares(){
        //Indicamos a Expres que nos despliegue el directorio publico
        //Implementamos el Middleware use() de Express
        //Envio por argumento el directorio estatico que quiero mostrar
        this.app.use( express.static( path.resolve( __dirname, '../public' ) ) );

        //Cofiguracion del CORS necesaria si queremos que otros clientes se puedan conectar al Socket Server si no estan en el mismo dominio
        //Habilitamos CORS
        this.app.use( cors() );


    }

    //Configuracion de los Sockets
    configureSockets(){
        //Todas las configuraciones se encuentran en this.io
        new Socket( this.io );
    }
  

    //Metodo encargado de iniciallizar la app
    execute(){
        
        //Inicializamos los Middlewares
        this.middlewares();

        //Inicializamos los Sockets
        this.configureSockets();

        //Inicializar el Server
        this.server.listen( this.port , () => {
            console.log('Server corriendo en puerto:', this.port );
        });
    }
    
}

//En Node si quiero utilizar la clase en otras clases, tengo que realizar la exportacion
module.exports = Server;