import React,{useEffect,useState} from 'react'
import Flightitem from "../components/Flightitem";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
import {useFlight} from '../context/Flight'


const ReturnSearch = () => {

    const navigate = useNavigate()
    const params = useParams()
    const {searchflights,tripFlights, setTripFlights,localpassengers, setLocalPassengers} = useFlight()

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

        if(searchflights[2].tripValue === 'Return'){
            updateTripFlights(1, flight)
            navigate(`/passengerdetails`)
        }
    }

  return (
    <div className="flight-item-con">
        <div>{searchflights[4].destinationdate}</div>
        <div className='flight-item-title'>
            Select your departure flight
            <div>from <span>{searchflights[1].arrival}</span> to <span>{searchflights[0].departure}</span></div> 
        </div>
        {flights.map((flight) => {
            return <Flightitem key={flight._id} flight={flight} onChange={bookFlight}/>
        })}
        {/* <div className='d-flex justify-content-center'>
        {showElement?<div className='undo-alert-con'>
                        <div>Departure selected</div>
                        <div onClick={undoSelection} >Undo selection</div>
                    </div>
                    :<></>
        }
        </div> */}
    </div>
  )
}

export default ReturnSearch