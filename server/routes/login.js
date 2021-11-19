const MongoClient = require('mongodb').MongoClient;
const jwt = require('jsonwebtoken');


const login = (req, res) => {
    const { username, email } = req.body


    MongoClient.connect(process.env.DB)
        .then(client => {
            const USER = []
            client.db().collection("users").find({ $and: [{ "username": username }, { "email": email }] })
                .forEach(user => {
                    USER.push(user)
                })
                .then(() => {
                    if (Object.keys(USER).length > 0) {
                        jwt.sign({ USER }, process.env.key, (err, token) => {
                            if (err) {
                                console.log(err)
                                res.sendStatus(500);
                            }
                            res.json({ token });
                        });
                    } else {
                        res.send("User does not exist !")
                    }
                    client.close()
                })
        }

        )
}

exports.login = login