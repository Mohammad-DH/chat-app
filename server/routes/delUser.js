const MongoClient = require('mongodb').MongoClient;

const delUser = (req, res) => {
    const Admin = []
    const { admin, password, target } = req.body
    MongoClient.connect(process.env.DB)
        .then(client => {
            client.db().collection("admin").find({}).forEach(item => {
                Admin.push(item)
            }).then(() => {
                if (Object.keys(Admin).length > 0) {
                    if (admin === Admin[0].admin && password === Admin[0].password) {
                        res.send("done")
                        MongoClient.connect(process.env.DB)
                            .then(client => {
                                client.db().collection("users").deleteOne({ "username": target })
                                MongoClient.connect(process.env.DB)
                                    .then(client => {
                                        client.db().collection("messages").deleteMany({ $or: [{ "to": target }, { "by": target }] })
                                    })
                            })
                    } else {
                        res.send("bad input")

                    }

                }
                client.close()
            })
        })

}
exports.delUser = delUser