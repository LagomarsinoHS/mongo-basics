const mongoose = require('mongoose')

//Connect to Database
mongoose.connect('mongodb://localhost/mongo-basics')
    .then(x => console.log('Db Connected'))
    .catch(err => console.log('It was a problem', err))

// After we are connected, we will insert an user

const User = require('./model/user.model')

async function addUser() {
    // Esta forma lo crea y guarda inmediatamente
    try {
        await User.deleteMany()
        const newUser = await User.create({
            name: 'test',
            age: 33,
            hobbies: ['Weight Lifting', 'Coding'],
            email: 'TEST@gmail.com',
            address: {
                street: 'main'
            },
            bestFriend: '6419faed7d4b0c2d5a03dccb'
        })
        console.log({ newUser, usingStatic: await User.findByName('teST'), usingQueryMethod: await User.find().over30() });

        // Puedo hacer queries de busqueda de 2 formas
        const firstWay = await User.findOne({ name: 'Humberto', age: { $gt: 10 } })
        const secondWay = await User.find()
            .where('name')
            .equals('Humberto')
            .where('bestFriend')
            .exists()
            .populate('bestFriend') // Esto en la busqueda cuando traiga el valor del bestFriend, traera todos sus campos tambien
            .limit(1)
        //console.log("first way", firstWay);
        console.log('-----------------------------');
        console.log("2nd way", secondWay);

        //Utilizando un metodo creado para User
        firstWay.sayHi()
    } catch (e) {
        console.log(e.message);
    }

}
addUser()