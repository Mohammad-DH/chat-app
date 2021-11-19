const MongoClient = require('mongodb').MongoClient;
const jwt = require('jsonwebtoken');

const allContacts = (req, res) => {
    jwt.verify(req.token, process.env.key, (err, authData) => {
        if (err) {
            res.sendStatus(403);
            console.log(err)
        } else {
            const list = []
            const user = authData.USER[0].username
            MongoClient.connect(process.env.DB)
                .then(client => {
                    client.db().collection("users").find({ "username": user })
                        .forEach(item => {
                            list.push(item)
                        })
                        .then(() => {
                            if (Object.keys(list).length > 0) {
                                let contacts = list[0].contacts
                                let Data = []
                                MongoClient.connect(process.env.DB)
                                    .then(client => {
                                        client.db().collection("users").find({ "username": { $in: contacts } }).forEach(iteam => {
                                            Data.push(iteam)
                                        }).then(() => {

                                            res.send({
                                                "myData": list, "contacts": Data
                                            })
                                        })
                                    })
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
exports.allContacts = allContacts