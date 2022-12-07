const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true,
    },
    countrycode:{
        type:String,
        required: true,
    },
    mobilenumber:{
        type:String,
        required: true,
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
        required: true
    },
    gender:{
        type:String,
    },    
    state:{
        type:String,
        required: true
    },

})


module.exports = mongoose.model('User',userSchema)