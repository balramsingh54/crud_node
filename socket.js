const socketio = require('socket.io');


const connect = async (server) => {

	const io = socketio(server)
	
	io.on('connection', (socket) => {

		console.log('Connected');


		socket.on('disconnect', function(){
			console.log('disconnect');
		});

	});
};


module.exports = { connect };


// io.on('connection', function(socket){
//    console.log('A new user connected');
   
//   // Whenever someone disconnects this piece of code executed
//    socket.on('disconnect', function () {
//       console.log('A user disconnected');
//    });
// });
