const MongoClient = require('mongodb').MongoClient;
const jwt = require('jsonwebtoken');

const allMessages = (req, res) => {
    jwt.verify(req.token, process.env.key, (err, authData) => {
        if (err) {
            res.sendStatus(403);
            console.log(err)
        } else {
            const list = []
            const user = authData.USER[0].username
            MongoClient.connect(process.env.DB)
                .then(client => {
                    client.db().collection("messages").find({ $or: [{ "by": user }, { "to": user }] })
                        .forEach(item => {
                            list.push(item)
                        })
                        .then(() => {
                            if (Object.keys(list).length > 0) {
                                res.send(list)
                            } else {
                                res.send("no message")
                            }
                            client.close()
                        })

                }).catch(err => {
                    console.log(err)
                })

        }
    })
}
exports.allMessages = allMessages