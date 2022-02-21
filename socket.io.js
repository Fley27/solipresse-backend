let io;
const { Server } = require("socket.io");

module.exports = {
    init: httpServer => {

        io = new Server(httpServer, {
            cors: {
                origin: "*",
                methods: ["GET", "POST", "PUT"]
            }
        });

        return io;
    },
    getIo: () => {
        if(!io)
            console.log("Socket.io not initialized");
            //throw new Error("Socket.io not initialized");
        else 
            console.log("Ok");
        return io;
    }
}