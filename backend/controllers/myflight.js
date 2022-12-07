const Myflight = require("../models/Myflight")

const getAllFlights = async (req,res) =>{
    try {
        const flights = await Myflight.find({user:req.user.id})
        res.status(200).json({flights,success:true})
    } catch (error) {
        res.status(401).json({msg:'interanl server error'})
    }
}


const getparticularFlights = async (req,res) =>{
    try {
        const flights = await Myflight.find(req.query)
        res.status(200).json({flights,success:true})
    } catch (error) {
        res.status(401).json({msg:'interanl server error'})
    }
}

const bookFlightWithLogin = async(req,res) => {
    try {
        const {totalprice,triptype,tripclass,flightname, flightnumber, departure, departuretime, departuredate, departureairport, departurecode, destination ,destinationtime, destinationairport, destinationcode, rflightname, rflightnumber, rdeparture,  rdeparturetime, rdepartureairport, rdeparturecode, rdestination , rdestinationtime, rdeparturedate, rdestinationairport, rdestinationcode} = req.body
        const booking = await Myflight.create( { user:req.user.id, totalprice, triptype, tripclass, flightname, flightnumber, departure, departuretime, departuredate, departureairport, departurecode, destination, destinationtime, destinationairport, destinationcode, rflightname, rflightnumber, rdeparture, rdeparturetime, rdepartureairport, rdeparturecode, rdestination ,rdestinationtime, rdeparturedate, rdestinationairport, rdestinationcode})
        res.status(200).json({booking,success:true})
    } catch (error) {
        res.status(401).json({msg:'internal server error', error})
    }
}

const bookFlight = async(req,res) => {
    try {
        const {totalprice,triptype,tripclass,flightname, flightnumber, departure, departuretime,departuredate, departureairport,departurecode, destination ,destinationtime, destinationairport, destinationcode, rflightname, rflightnumber, rdeparture,  rdeparturetime,rdeparturedate, rdepartureairport, rdeparturecode, rdestination , rdestinationtime, rdestinationairport, rdestinationcode} = req.body
        const booking = await Myflight.create( { totalprice,tripclass, triptype, flightname, flightnumber, departure, departuretime, departuredate,departureairport,departurecode, destination, destinationtime, destinationairport, destinationcode, rflightname, rflightnumber, rdeparture, rdeparturetime,rdeparturedate, rdepartureairport, rdeparturecode, rdestination ,rdestinationtime, rdestinationairport, rdestinationcode})
        res.status(200).json({booking,success:true})
    } catch (error) {
        res.status(401).json({msg:'internal server error', error})
    }
}

module.exports = {getAllFlights,bookFlightWithLogin,bookFlight,getparticularFlights}