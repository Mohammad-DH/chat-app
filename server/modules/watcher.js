const MongoClient = require('mongodb').MongoClient;
const jwt = require('jsonwebtoken');

const getdata = (socket) => {
    let user;
    let list = []

    socket.emit("getToken", "")
    socket.on("token", (token) => {
        jwt.verify(token, process.env.key, (err, authData) => {
            if (authData.USER[0].username) {
                user = authData.USER[0].username
            }
        })
    })
    MongoClient.connect(process.env.DB)
        .then(client => {
            client.db().collection("messages").find({ $or: [{ "by": user }, { "to": user }] })
                .forEach(item => {
                    list.push(item)
                }).then(() => {
                    socket.emit("all", list)
                })
        })

}

function watcher(socket) {
    console.log("watching...")

    MongoClient.connect(process.env.DB)
        .then(client => {
            let change = client.db().collection("messages").watch({})
            let ID;
            change.on("change", change => {
                if (ID && ID !== change._id) {
                    // console.log(1)
                    getdata(socket)

                } else if (!ID) {
                    // console.log(2)
                    ID = change._id
                    getdata(socket)

                } else {
                    // console.log(0)
                }
            });
        }).then(() => {
        })
        .catch(err => {
            console.log(err)
        })

}
exports.watcher = watcher