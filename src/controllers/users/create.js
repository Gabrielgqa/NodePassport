const User = require('./../../models/user')

module.exports = (req, res) => {
    let user = new User(req.body)
    
    user.password = user.genHash(user.password)

    user
        .save()
        .then((user) => {
            return res.redirect('/users')
        })
        .catch((error) => {
            console.log(error)
            return
        })
}