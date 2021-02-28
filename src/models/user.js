const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    publicId: {
        type: String,
    },
    imageUrl: {
        type: String,
        required: false
    }
},{timestamps: true})

const User = mongoose.model('User', userSchema)

module.exports = User