const MongoClient = require('mongodb').MongoClient;

const admin = (req, res) => {
    const Admin = []
    const { admin, password } = req.body
    MongoClient.connect(process.env.DB)
        .then(client => {
            client.db().collection("admin").find({}).forEach(item => {
                Admin.push(item)
            }).then(() => {
                if (Object.keys(Admin).length > 0) {
                    if (admin === Admin[0].admin && password === Admin[0].password) {
                        const list = []
                        MongoClient.connect(process.env.DB)
                            .then(client => {
                                client.db().collection("users").find({})
                                    .forEach(item => {
                                        list.push(item)
                                    })
                                    .then(() => {
                                        if (Object.keys(list).length > 0) {
                                            res.send(list)
                                        } else {
                                            res.send("no user")
                                        }
                                        client.close()
                                    })
                            })
                    } else {
                        res.send("bad input")
                    }

                } else {
                    MongoClient.connect(process.env.DB)
                        .then(client => {
                            client.db().collection("admin").insertOne({ admin, password })
                        }).then(() => {
                            const list = []
                            MongoClient.connect(process.env.DB)
                                .then(client => {
                                    client.db().collection("users").find({})
                                        .forEach(item => {
                                            list.push(item)
                                        })
                                        .then(() => {
                                            if (Object.keys(list).length > 0) {
                                                res.send(list)
                                            } else {
                                                res.send("no user")
                                            }
                                            client.close()
                                        })
                                })

                        })

                }
                client.close()
            })
        })







}
exports.admin = admin