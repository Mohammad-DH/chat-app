const MongoClient = require('mongodb').MongoClient;

const signin = (req, res) => {
    const { username, email } = req.body

    // send it to data base

    MongoClient.connect(process.env.DB)
        .then(client => {
            const USER = []
            client.db().collection("users").find({ $or: [{ "username": username }, { "email": email }] })
                .forEach(user => {
                    USER.push(user)
                })
                .then(() => {
                    if (Object.keys(USER).length > 0) {
                        res.send("this user exist")
                    } else {
                        MongoClient.connect(process.env.DB)
                            .then(client => {
                                client.db().collection("users").insertOne({ "username": username, "email": email, "contacts": [], "profile": {} })
                            })
                        res.send("user added")
                    }
                    client.close()
                })
        }

        )

}
exports.signin = signin