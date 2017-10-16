const
    mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs')
    usersSchema = new mongoose.Schema({
        userName: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true}
    }, {timestamps: true})

usersSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
}

usersSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('User', usersSchema)