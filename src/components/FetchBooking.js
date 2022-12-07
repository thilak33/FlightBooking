import React,{useContext} from 'react'
import flightContent from "../context/FlightContext";
import '../styles/FetchBooking.css'

const FetchBooking = () => {
    const content = useContext(flightContent)
    const {fetchbooking, fetchpassenger, createPdf, getPdf} = content 
    const host = "http://localhost:4000"

    const download = async(bid) => {
        const response = await fetch(`${host}/api/v1/myflight?_id=${bid}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            }
        });
        const pbdata = await response.json()
        if(pbdata.success){
            const response = await fetch(`${host}/api/v1/getpassofbook?_id=${bid}`,{
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                }
            })
            const bpdata = await response.json()
            console.log(bpdata)
            if(bpdata.success){
                createPdf(localStorage.getItem('BookingID'),bpdata.passenger, pbdata.flights)
                .then(()=> getPdf())
            }
    }
  }

  return (
    <div>
        <div className='fetch-flight-con'>
                <div>
                    {fetchbooking.map((element)=>{
                        return  <>
                                    <div className='ff-body-con'>
                                        <div className='ff-bl-con'>
                                            <div className='bs-con'>
                                                <div className='ffc-s-item'>BOOKING ID</div>
                                                <div className='ffc-s-item dgc-item'>CLASS</div>
                                                <div className='ffc-s-item'>BOOKING STATUS</div>
                                                <div>{element._id}</div>
                                                <div className='dgc-item'>ECONOMY</div>
                                                <div>BOOKING CONFIRMED</div>
                                            </div>
                                            <div className='bf-con'>
                                                <div className='ff-bc-item'>
                                                    <div className='bf-con-head'>
                                                        <div className='d-flex justify-content-between'>
                                                            <div className='ffc-m-item'>Outbound flight</div>
                                                            <div className='ffc-m-item'>{element.departuredate}</div>
                                                        </div>
                                                        <div className='ffc-m-b-item'>{element.flightname} {element.flightnumber}</div>
                                                    </div>
                                                    <div className='bf-con-body'>
                                                        <div>
                                                            <div className='ffc-s-item'>DEPARTURE</div>
                                                            <div className='ffc-l-item'>{element.departurecode}-{element.departuretime}</div>
                                                            <div className='ffc-m-b-item'>{element.departuredate}</div>
                                                            <div className='ffc-m-item'>{element.departure}</div>
                                                            <div className='ffc-m-item'>{element.departureairport}</div>
                                                        </div>
                                                        <div className='dgc-item'>
                                                            <div className='ffc-s-item'>DURATION</div>
                                                            <div className='ffc-l-item'>3hr</div>
                                                        </div>
                                                        <div>
                                                            <div className='ffc-s-item'>ARRIVAL</div>
                                                            <div className='ffc-l-item'>{element.destinationcode}-{element.destinationtime}</div>
                                                            <div className='ffc-m-b-item'>{element.departuredate}</div>
                                                            <div className='ffc-m-item'>{element.destination}</div>
                                                            <div className='ffc-m-item'>{element.destinationairport}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {element.triptype === 'Return'?
                                                    <div className='ff-bc-item'>
                                                    <div className='bf-con-head'>
                                                        <div className='d-flex justify-content-between'>
                                                            <div className='ffc-m-item'>Outbound flight</div>
                                                            <div className='ffc-m-item'>{element.rdeparturedate}</div>
                                                        </div>
                                                        <div className='ffc-m-b-item'>{element.rflightname} {element.rflightnumber}</div>
                                                    </div>
                                                    <div className='bf-con-body'>
                                                        <div>
                                                            <div className='ffc-s-item'>DEPARTURE</div>
                                                            <div className='ffc-l-item'>{element.rdeparturecode}-{element.rdeparturetime}</div>
                                                            <div className='ffc-m-b-item'>{element.rdeparturedate}</div>
                                                            <div className='ffc-m-item'>{element.rdeparture}</div>
                                                            <div className='ffc-m-item'>{element.rdepartureairport}</div>
                                                        </div>
                                                        <div className='dgc-item'>
                                                            <div className='ffc-s-item'>DURATION</div>
                                                            <div className='ffc-l-item'>3hr</div>
                                                        </div>
                                                        <div>
                                                            <div className='ffc-s-item'>ARRIVAL</div>
                                                            <div className='ffc-l-item'>{element.rdestinationcode}-{element.rdestinationtime}</div>
                                                            <div className='ffc-m-b-item'>{element.rdeparturedate}</div>
                                                            <div className='ffc-m-item'>{element.rdestination}</div>
                                                            <div className='ffc-m-item'>{element.rdestinationairport}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                    :
                                                    <></>
                                                }
                                            </div>
                                        </div>
                                        <div className='ff-br-con'>
                                            <div className='bp-con'>
                                                <div className=''>Payment Details</div>
                                                <div className='d-flex justify-content-between'>
                                                    <div>Base fare</div>
                                                    <div>{element.totalprice}</div>
                                                </div>
                                                <div className='d-flex justify-content-between'>
                                                    <div>Amount Paid</div>
                                                    <div>{element.totalprice}</div>
                                                </div>
                                            </div>
                                            <div className='bpd-con'>
                                                <div className=''>Passenger Details</div>
                                                <div className='d-flex justify-content-between'>
                                                    <div className='ffc-s-item'>PASSENGER</div>
                                                    <div className='ffc-s-item dgc-item'>TYPE</div>
                                                </div>
                                                {fetchpassenger.map((element)=>{
                                                    return  <>
                                                            <div className='d-flex justify-content-between'>
                                                                <div>{element.firstname} {element.lastname}</div>
                                                                <div className='dgc-item'>Adult</div>
                                                            </div>
                                                            </>
                                                    })
                                                }                  
                                            </div>
                                            <div>
                                            {fetchbooking.map((element)=>{
                                                    return  <>
                                                            <div className='d-flex justify-content-center'>
                                                                <button className='dwd-btn' onClick={()=>download(element._id)}>Download</button>
                                                            </div>
                                                            </>
                                                    })
                                                } 
                                            </div>
                                        </div>
                                    </div>
                                </>
                            }
                        )
                    }
                </div>
        </div>
    </div>
  )
}

export default FetchBooking