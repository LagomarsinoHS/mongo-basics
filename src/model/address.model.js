const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema({
    street: String,
    city: Number,
}, {
    timestamps: false
})

//module.exports = mongoose.model('Street', addressSchema)
module.exports = addressSchema