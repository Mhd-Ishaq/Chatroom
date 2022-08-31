const express = require ('express');
const app = express();
const http = require ('http');
const cors = require("cors");
const {Server} = require('socket.io');
const port = process.env.PORT;

app.use(cors());

const server = http.createServer(app);

app.get('/',(req,res)=>{
  res.send("hello there")
})

const io = new Server(server);

io.on("connection",(socket)=>{
  // console.log(`User connected:${socket.id}`);

  socket.on('join_room',(data)=>{
    socket.join(data);
    // console.log(`User with ID:${socket} joined room :${data}`);
  });

  socket.on("send_message",(data)=>{
    // console.log(data);
    socket.to(data.room).emit("receive_message",data)
  });


  socket.on("disconnect",()=>{
    // console.log("user Disconnected",socket.id)
  })

})



server.listen(port ,()=>{
  console.log(`server is running at ${port}` );
})

