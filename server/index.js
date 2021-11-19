const cors = require('cors');
require('dotenv').config();
const express = require('express');
const app = express();
const port = 8000

const { SendMessage } = require('./modules/SendMessage');

var server = require('http').Server(app);
var io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
});

//Routes

const { delUser } = require("./routes/delUser");
const { admin } = require("./routes/admin");
const { signin } = require("./routes/signin");
const { login } = require("./routes/login");
const { allMessages } = require("./routes/allMessages");
const { allContacts } = require("./routes/allContacts");
const { newContact } = require("./routes/newContact");
const { VerifyToken } = require('./modules/VerifyToken');
const { watcher } = require('./modules/watcher');
const { delContact } = require('./routes/delContact');



app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(cors())

app.post('/delcontact', VerifyToken, delContact)
app.post('/deluser', delUser)
app.post('/admin', admin)
app.post('/newcontact', VerifyToken, newContact)
app.post('/allcontacts', VerifyToken, allContacts)
app.post('/allmessages', VerifyToken, allMessages)
app.post('/signin', signin)
app.post('/login', login)

// socket.io listener
var num = 0
io.on("connection", (socket) => {
    num++
    console.log(num + "connection has been made")

    socket.on("resive", (message) => {
        SendMessage(message, socket)
    })
    watcher(socket)
})

io.on("disconnect", (socket) => {
    console.log("*** disconect ***")
})


server.listen(port, () => {
    console.log(`server is up on http://localhost:${port}`)
})