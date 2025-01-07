module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('User connected');
        socket.on('message', (msg) => {
            io.emit('message', msg);
        });
    });
};