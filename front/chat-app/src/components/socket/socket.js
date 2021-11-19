import io from "socket.io-client";
let socket = io.connect('http://localhost:8000')

// socket.on("messages-list", (e) => {
//     let { message, date, by, to } = e
//     console.log(message, date, by, to);
// });


export default socket