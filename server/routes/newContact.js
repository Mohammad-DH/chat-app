const MongoClient = require('mongodb').MongoClient;
const jwt = require('jsonwebtoken');

const newContact = (req, res) => {
    jwt.verify(req.token, process.env.key, (err, authData) => {
        if (err) {
            res.sendStatus(403);
            console.log(err)
        } else {
            const { email } = req.body
            const user = authData.USER[0].username

            MongoClient.connect(process.env.DB)
                .then(client => {
                    const List = []
                    client.db().collection("users").find({ "email": email })
                        .forEach(user => {
                            List.push(user)
                        })
                        .then(() => {
                            if (Object.keys(List).length > 0) {
                                let ContactUsername = List[0].username
                                let userContacts;

                                MongoClient.connect(process.env.DB)
                                    .then(client => {
                                        client.db().collection("users").find({ "username": user }).forEach(e => {
                                            userContacts = e.contacts
                                            if (userContacts.indexOf(ContactUsername) !== -1) {
                                                res.send("this Contact alredy exist")
                                            } else {
                                                MongoClient.connect(process.env.DB)
                                                    .then(client => { client.db().collection("users").updateOne({ "username": user }, { $push: { "contacts": ContactUsername } }) })
                                                MongoClient.connect(process.env.DB)
                                                    .then(client => { client.db().collection("users").updateOne({ "username": ContactUsername }, { $push: { "contacts": user } }) })
                                                    .then(() => {
                                                        res.send("contact has been added")
                                                    })
                                            }
                                        })
                                    })
                            } else {
                                res.send("no such a user")
                            }
                            client.close()
                        })
                }

                )
        }
    })
}
exports.newContact = newContact