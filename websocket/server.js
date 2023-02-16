const app = require("./app");
const port = 3001;
const http = require("http");
const { Server } = require("socket.io");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
dotenv.config({ path: "config/config.env" });

const server = http.createServer(app);


connectDatabase();

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// Listen for incoming WebSocket connections
io.on('connection', socket => {
    console.log(socket.id);
    socket.on('newInventoryCreated',(data) => {
      console.log(data)
      socket.broadcast.emit('newInventory','new inventory created please refresh')
    });
  });

  

//unhandled prommis rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error:${err.massage}`);
  console.log(`sutting the server due to unhadled promise rejection`);
  process.exit(1);
});

//unhandled prommis rejection at mongodb
process.on("unhandledRejection", (err) => {
  console.log(`Error:${err.massage}`);
  console.log(`sutting the server due to unhadled promise rejection`);
  server.close(() => {
    process.exit(1);
  });
});

// Start the server
server.listen(port, () => {
  console.log(`server is working on http://localhost:${port}`);
});
module.exports = io;