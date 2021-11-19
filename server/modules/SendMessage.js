const MongoClient = require('mongodb').MongoClient;
const jwt = require('jsonwebtoken');

const SendMessage = ({ token, data }, socket) => {
    jwt.verify(token, process.env.key, (err, authData) => {
        if (err) {

        } else {
            const message = data.input
            const date = new Date().toISOString()
            const by = authData.USER[0].username
            const to = data.target.username
            MongoClient.connect(process.env.DB)
                .then(client => {
                    client.db().collection("messages").insertOne({ message, date, by, to })
                })
                .catch(err => {
                    console.log(err)
                })

        }
    })
}
exports.SendMessage = SendMessage