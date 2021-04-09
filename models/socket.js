//Clase para segmentar la lógica de los events de los Sockets

//Nos permite tener control sobre los clientes que se van conectando
class Socket {
    //Necesito obtener el io, el Socket Server
    constructor( io ){
       //Creacion de las propiedades de clase en JS
        this.io = io;
        this.socketEvents();
        //Array de clientes

    }

    //Metodo que cotiene todos los eventos de la comunicacion de Sockets
    socketEvents(){
        
        //Realizamos la conexion Cliente- Socket Server
        //Socket, cliente que se conecta al Server
        this.io.on('connection', ( socket ) => {

        //Indica que un dispositivo se conecto, NO UN USUARIO, ya que un usuario se puede conectar desde multiples dispositivos

        //Cuando un cliente se conecta al Backend le mostramos un mensaje de bienvenida, peticion POST
        //Emit(), funcion de socket.io que permite emitir un evento, instrucciones que se disparan
        //Primer argumento, evento que se dispara
        //Segundo argumento, payload o arguemnto que queremos enviar al cliente
        /*socket.emit('mensaje-bienvenida', {
            //No es recomedable emitir tipos primitivos, si no que establecer un objeto literal que nos permite enviar más informacion
            msg: 'Bienvenido al server',
            date: new Date()
        });*/

        //Escuchar el evento mensaje-to-server
        //Primer argumento, evento que quiero escuchar
        //Segundo argumento, funcion fetch que ejecuto cuando recibo el event
        //De esta forma no se emite a todos los clientes, si no que solo se emite al socket del lado del cliente, 
        //Hay que implmentar io para enviar una notificacion a todos los clientes del server, a todo lo que se encuentra conectado al mismo namespace
        socket.on('mensaje-to-server', ( data ) => {
            console.log(data);
            //Cuando se recibe el mensaje que se notifique a todos los clientes conectados al Server
            //io() nos permite notificar a todos los clientes conectados
            this.io.emit('mensaje-from-server', data);
        });
});


    }


}

module.exports = Socket;