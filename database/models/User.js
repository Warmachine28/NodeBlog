const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


const UserSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },

    email: {
        type: String,
        unique: true,
        required: true
    },

    password: {
        type: String,
        required: true
    }
})

UserSchema.pre('save',function(next){
    const user = this
    bcrypt.hash(user.password, 10, function(error, encrypted){
        user.password = encrypted
        next()
    })

    
})


module.exports = mongoose.model('User', UserSchema)