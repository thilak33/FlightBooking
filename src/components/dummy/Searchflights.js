import React,{useContext,useEffect} from 'react'
import Flightitem from "../Flightitem";
import flightContent from "../../context/FlightContext";


const Searchflights = () => {
    const content = useContext(flightContent)
    const {flights, getFlights, setFlights, setSearch, departure, setDeparture, arrival, setArrival, tripValue, settripValue, rflights, setRflights, tripFlights} = content 

    useEffect(() => {
      setSearch('true')
      setDeparture(localStorage.getItem('departure'))
      setArrival(localStorage.getItem('destination'))
      settripValue(localStorage.getItem('triptype'))
      const controller = new AbortController();
      const signal = controller.signal;

      getFlights(localStorage.getItem('departurecode'),localStorage.getItem('destinationcode'),signal)
      .then((data)=>{setFlights(data.flights)})
      .catch(err=>{
        if(err.name === "AbortError"){
          console.log('aborted')
        }
      })
      if(localStorage.getItem('triptype') === 'Return'){
        getFlights(localStorage.getItem('destinationcode'),localStorage.getItem('departurecode'),signal)
        .then((data)=>{setRflights(data.flights)})
        .catch(err=>{
          if(err.name === "AbortError"){
            console.log('aborted')
          }
        })
      }
      return () => {
        controller.abort();
      }
    }, [])

  return (
    <div className="flight-item-con">
      <div>
        <div>Select Flight from {departure} to {arrival}</div>
        {flights.map((flight) => {
            return <Flightitem key={flight._id} flight={flight}/>
        })}
        {tripFlights.map((trip)=> {
          const{} =trip
          return <>
                  <div>
                    <div>departure selected</div>
                    <div>Undo selectiom</div>
                  </div>
                </>
        })}
      </div>
      {localStorage.getItem('triptype') === 'Return'?
      <div>
        <div>Select Flight from {arrival} to {departure}</div>
        {rflights.map((flight) => {
            return <Flightitem key={flight._id} flight={flight}/>
        })}
      </div>:<></>
      }
  </div>
  )
}

export default Searchflights