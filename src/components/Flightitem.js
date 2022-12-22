import React from 'react'
import { useFlight } from '../context/Flight'

const Flightitem = ({flight,onChange}) => {




    const { searchflights} = useFlight()

    // const updateTripFlights = (index, value) => {
    //     const utf = tripFlights.map((c, i) => {
    //         if (i === index) {
    //             return value;
    //         } else {
    //             return c;
    //         }
    //     });
    //     setTripFlights(utf);
    //     localStorage.setItem('tripFlights', JSON.stringify(utf))
    // }

    // const bookFlight = (flight) => {

    //     if (searchflights[2].tripValue === 'One-way') {
    //         updateTripFlights(0, json.flights[0])
    //         navigate('/passengerdetails')
    //     }
    //     if(searchflights[2].tripValue === 'Return'){
            
    //     }
        //     if(searchflights[2].tripValue === 'One-way'){
        //         const response = await fetch(`${host}/api/v1/flights?_id=${flightid}`, {
        //             method: 'GET',
        //             headers: {
        //               'Content-Type': 'application/json',
        //             }
        //         });
        //         const json = await response.json()
        //         updateTripFlights(0,json.flights[0])
        //         setSearch('false')
        //         navigate('/passengerdetails')
        //     }
        //     if(searchflights[2].tripValue === 'Return'){
        //         const response = await fetch(`${host}/api/v1/flights?_id=${flightid}`, {
        //             method: 'GET',
        //             headers: {
        //               'Content-Type': 'application/json',
        //             }
        //         });
        //         const json = await response.json()
        //         updateTripFlights(condition,json.flights[0])
        //         if(condition === 0){
        //             setCondition(condition+1)
        //             navigate('/rsearch')
        //         }
        //         if(condition === 1){
        //             setSearch('false')
        //             navigate('/passengerdetails')
        //         }
        //     }
        //   }
    // }


        return (
            <div className='flight-item'>
                <div className='airways-details'>
                    <div className='details-item'>{flight.flightname}</div>
                    <div className='details-item'>{flight.flightnumber}</div>
                </div>
                <div className='td-details'>
                    <div>
                        <div className='details-item'>{flight.departuretime}</div>
                        <div className='details-item'>{flight.departurecode}</div>
                    </div>
                    <div className='d-flex align-items-center'>
                        <div className='journey-line'></div>
                    </div>
                    <div>
                        <div className='details-item'>{flight.destinationtime}</div>
                        <div className='details-item'>{flight.destinationcode}</div>
                    </div>
                </div>
                <div className='d-flex align-items-center justify-content-center'>
                    <div className='price-details'>&#8377;{(searchflights[5].passengerCount - searchflights[5].infantCount) * (searchflights[5].passengerClass === 'Economy' ? flight.economyprice : flight.premiumprice)}</div>
                </div>
                <div className='d-flex align-items-center justify-content-end'>
                    <button onClick={() =>onChange(flight)} className='book-btn'>Select</button>
                </div>
            </div>
        )
    }

    export default Flightitem