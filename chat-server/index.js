const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const cors = require('cors');

app.use(cors());
app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html');
});

let bagli = 0;
io.on('connection',socket=>{
bagli++;
console.log('user connected'+bagli);
    socket.on('update',data=>{
        console.log('data: '+data);
        io.emit('update',{data});
    });
    socket.on('disconnect',()=>{
        console.log('user disconnected');
        bagli--;
        io.emit('kisisayisi',{kisiSayisi:bagli});

    }) ;
    io.emit('kisisayisi',{kisiSayisi:bagli});
});

server.listen(3030);