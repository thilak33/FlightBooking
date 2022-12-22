import React,{ useState,useEffect} from 'react'
import Flightitem from "../components/Flightitem";
import '../styles/Search.css'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
import {useFlight} from '../context/Flight'



const OnewaySearch = () => {
    
    const navigate = useNavigate()
    const params = useParams()
    const {searchflights,tripFlights, setTripFlights} = useFlight()

    const[flights,setFlights]= useState([])

    const getFlights = async(from,to) => {
        const {data} = await axios.get(`/flights?departurecode=${from}&destinationcode=${to}`)
        setFlights(data.flights)
    }
    
    
    useEffect(() => {
        const searchquery = params.slug.split('&')
        const controller = new AbortController();
        const signal = controller.signal;
        if(searchquery[0] && searchquery[1]){
            getFlights(searchquery[0],searchquery[1])
        }
    }, [])


    const updateTripFlights = (index, value) => {
        const utf = tripFlights.map((c, i) => {
            if (i === index) {
                return value;
            } else {
                return c;
            }
        });
        setTripFlights(utf);
        localStorage.setItem('tripFlights', JSON.stringify(utf))
    }

    const bookFlight = (flight) => {

        if (searchflights[2].tripValue === 'One-way') {
            updateTripFlights(0, flight)
            navigate('/passengerdetails')
        }
        if(searchflights[2].tripValue === 'Return'){
            updateTripFlights(0, flight)
            navigate(`/rsearch/${searchflights[1].arrivalcode}&${searchflights[0].departurecode}`)
        }
    }

  return (
    <div className="flight-item-con">
        <div>{searchflights[2].tripValue ==='One-way'?searchflights[3].departuredate:searchflights[4].departuredate}</div>
        <div className='flight-item-title'>
            Select your departure flight
            <div>from <span>{searchflights[0].departure}</span> to <span>{searchflights[1].arrival}</span></div> 
        </div>
        {flights.map((flight) => {
            return <Flightitem key={flight._id} flight={flight} onChange={bookFlight}/>
        })}
    </div>
  )
}

export default OnewaySearch


// import React from 'react'

// const OnewaySearch = () => {
//   return (
//     <div>OnewaySearch</div>
//   )
// }
// export default OnewaySearch