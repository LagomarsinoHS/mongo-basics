const mongoose = require('mongoose')
const Address = require('./address.model')
const userSchema = new mongoose.Schema({
    name: String,
    age: {
        type: Number,
        min: 1,
        max: 100,
        validate: {
            validator: v => 18 <= v,// Con esto podemos crear validadores, cuando el validador solo de FALSE se ejecutará
            message: props => `can not be lower than 18, received: ${props.value}`
        }
    },
    // Si quiero definir con mas detalle, uso un objeto en vez del tipo directamente
    email: {
        type: String,
        required: true,
        lowercase: true,
        minLength: 10
    },
    hobbies: {
        type: [String]
    },
    address: Address, // Puedo asignarle otro ESQUEMA, mas no otro modelo (almenos aqui no se como)
    bestFriend: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
}, {
    timestamps: true
})

//Puedo crear metodos para la cada instancia de, en este caso, users. Es decir, cada user puede acceder a este metodo y hacer lo que le defina
//Este metodo puede ser usado LUEGO de haber encontrado o tener en uso un usuario, no al User como tal, sino al  const user = User.find()
userSchema.methods.sayHi = function () {
    if (this) console.log(`${this.name} is saying Hi`);
}

// Puedo crear metodos estaticos del esquema
// Este metodo se puede usar directamente con el User como tal
userSchema.statics.findByName = function (name) {
    return this.find({ name: new RegExp(name, 'i') })
}

// Puedo crear un metodo que funcione directo SOBRE una query y no el esquema
userSchema.query.over30 = function () {
    return this.where({ age: { $gt: 30 } })
}

// Middelwares
//Puedo hacer que antes de guardar haga algo
userSchema.pre('save', function (next) {
    this.updatedAt = Date.now()
    next()
})

// Puedo hacer que luego de guardar algo llame una funcion
// Este middleware necesita que se le pase el documento que se creo para que sepa que hacer
userSchema.post('save', function (doc, next) {
    doc.sayHi()
    next()
})

module.exports = mongoose.model('User', userSchema)