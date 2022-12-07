const Flight = require('../models/Flight')

const allflights = async(req,res) => {
    try {
        const{departurecode,destinationcode,sort,_id} = req.query
        const queryObject = {};
        if(departurecode){
            queryObject.departurecode= departurecode
        }
        if(destinationcode){
            queryObject.destinationcode= destinationcode
        }
        if(_id){
            queryObject._id= _id
        }
        let result = Flight.find(queryObject);
        if(sort){
            sortList = sort+'price'
            result = result.sort(sortList);
        }
        const flights = await result;
        res.status(200).json({flights})
    } catch (error) {
        console.log(error)
    }
}

const createFlight = async (req,res) => {
    try {
        const flights = await Flight.create(req.body)
        res.status(200).json(flights)
    } catch (error) {
        console.log(error)
    }
}




module.exports = {allflights , createFlight}