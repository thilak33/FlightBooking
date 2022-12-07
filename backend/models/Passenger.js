const mongoose = require('mongoose');

const passengerSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    bookingid:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Myflight',
    },
    firstname:{
        type:String,
        required: true
    },
    lastname:{
        type:String,
        required: true
    },
    dateofbirth:{
        type:String,
    },
    gender:{
        type:String,
    },    
    nationality:{
        type:String,
        required: true
    },
    passport:{
        type:String
    },
    passportexpirydate:{
        type:String
    },
    phonenumber:{
        type:Number
    },
    email:{
        type:String
    }
})


module.exports = mongoose.model('Passenger',passengerSchema)