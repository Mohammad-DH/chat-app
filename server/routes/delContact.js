const MongoClient = require('mongodb').MongoClient;
const jwt = require('jsonwebtoken');

const delContact = (req, res) => {
    jwt.verify(req.token, process.env.key, (err, authData) => {
        if (err) {
            res.sendStatus(403);
            console.log(err)
        } else {
            let { target } = req.body
            const user = authData.USER[0].username
            MongoClient.connect(process.env.DB)
                .then(client => {
                    client.db().collection("users").updateOne({ "username": user }, { $pull: { "contacts": target } })
                        .then(() => {
                            console.log("target" + target)
                            res.send("done")
                            client.close()
                        })

                }).catch(err => {
                    console.log(err)
                })

        }
    })
}
exports.delContact = delContact