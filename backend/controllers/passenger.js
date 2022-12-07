const Passenger = require('../models/Passenger')


const createPassengerwithuser = async (req,res) => {
    try {
        const {bookingid,firstname,lastname,dateofbirth,gender,nationality,passport, passportexpirydate, email,mobilenumber} = req.body
        const passenger = await Passenger.create({ user:req.user.id ,bookingid,firstname,lastname,dateofbirth,gender,nationality,passport, passportexpirydate, email,mobilenumber })
        res.status(200).json({passenger,success:true})
    } catch (error) {
        res.status(401).json({msg:'internal server error', error})
    }
}

const createPassenger = async (req,res) => {
    try {
        const {bookingid,firstname,lastname,dateofbirth,gender,nationality,passport, passportexpirydate, email,mobilenumber} = req.body
        const passenger = await Passenger.create({bookingid,firstname,lastname,dateofbirth,gender,nationality,passport, passportexpirydate, email,mobilenumber })
        res.status(200).json({passenger,success:true})
    } catch (error) {
        res.status(401).json({msg:'internal server error', error})
    }
}


const getPassenger = async (req,res) => {
    try {
        const passenger = await Passenger.find({ user:req.user.id})
        res.status(200).json({passenger,success:true})
    } catch (error) {
        res.status(401).json({msg:'internal server error', error})
    }
}

const getPassofBook = async (req,res)=>{
    try {
        const passenger = await Passenger.find({bookingid:req.query})
        res.status(200).json({passenger,success:true})
    } catch (error) {
        res.status(401).json({msg:'internal server error', error})
    }
}

module.exports = {createPassenger, getPassenger,createPassengerwithuser,getPassofBook}