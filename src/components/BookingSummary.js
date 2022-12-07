import React,{useContext,useEffect,useState,useRef} from 'react'
import '../styles/BookingSummary.css'
import flightContent from "../context/FlightContext";
import '../styles/BookingSummary.css'
import { useNavigate } from 'react-router-dom';
import * as moment from 'moment';

const BookingSummary = () => {
    const host = "http://localhost:4000"
    const content = useContext(flightContent)
    const { bookingstatus, setBookingStatus,tripFlights,setTripFlights,
        setSearchFlights,setSearchDate,searchdate, searchflights, primarypassenger,setPrimarypassenger, pwcd,setPwcd,setCondition,updateSearchFlights
        ,historyobject
        } = content 

        
    const alertBtn = useRef()
    const navigate = useNavigate()
    
    const [isBSBackButtonClicked, setIsBSBackButtonClicked] = useState(false)
    
    const onBSBackButtonEvent = (e) => {
        e.preventDefault();
        if(!isBSBackButtonClicked){
            let sf = JSON.parse(localStorage.getItem('searchflights'))
            if(sf[2].tripValue === 'One-way'){
                updateSearchFlights(3,moment(sf[3]))
                setIsBSBackButtonClicked(true)
                navigate('/')
            }
                if(sf[2].tripValue === 'Return'){
                let startDate = moment(sf[4].startDate)
                let endDate = moment(sf[4].endDate)
                updateSearchFlights(4,{startDate,endDate})
                setIsBSBackButtonClicked(true)
                navigate('/')
            }   
            navigate('/')
        }
    }   
    


    useEffect(() => {
        setSearchDate(localStorage.getItem('searchdate'))
        setTripFlights(JSON.parse(localStorage.getItem('tripFlights')))
        setSearchFlights(JSON.parse(localStorage.getItem('searchflights')))
        setPwcd(JSON.parse(localStorage.getItem('pwcd')))
        setPrimarypassenger(localStorage.getItem('primarypassenger'))

        window.history.pushState(historyobject, null, window.location.pathname);
        window.addEventListener('popstate', onBSBackButtonEvent);
    }, [])
      


    const totalPrice = () => {
        if(searchflights[5].passengerClass === 'Economy'){
            if(searchflights[2].tripValue === 'One-way'){
                return tripFlights[0].economyprice*(searchflights[5].passengerCount-searchflights[5].infantCount)
            }
            if(searchflights[2].tripValue === 'Return'){
                return (tripFlights[0].economyprice+tripFlights[1].economyprice)*(searchflights[5].passengerCount-searchflights[5].infantCount)
            }
        } 
        if(searchflights[5].passengerClass === 'Premium'){
            if(searchflights[2].tripValue === 'One-way'){
                return tripFlights[0].premiumprice*(searchflights[5].passengerCount-searchflights[5].infantCount)
            }
            if(searchflights[2].tripValue === 'Return'){
                return (tripFlights[0].premiumprice+tripFlights[1].premiumprice)*(searchflights[5].passengerCount-searchflights[5].infantCount)
            }
        } 
    }
    const bookandpay= async () => {
            if(localStorage.getItem('token')){
                const response = await fetch(`${host}/api/v1/auth/bookflight`,{
                    method:'POST',
                    headers:{
                        'Content-type':'application/json',
                        'auth-token':localStorage.getItem('token')
    
                    },
                    body: JSON.stringify({ 
                                    triptype: searchflights[2].tripValue,
                                    tripclass: searchflights[5].passengerClass,
                                    totalprice: searchflights[2].tripValue === 'Return' ? (searchflights[5].passengerCount - searchflights[5].infantCount) * (searchflights[5].passengerClass === 'Economy' ? tripFlights[0].economyprice + tripFlights[1].economyprice : tripFlights[0].premiumprice + tripFlights[1].premiumprice) : (searchflights[5].passengerCount - searchflights[5].infantCount) * (searchflights[5].passengerClass === 'Economy' ? tripFlights[0].economyprice : tripFlights[0].premiumprice),
                                    flightname:tripFlights[0].flightname,
                                    flightnumber:tripFlights[0].flightnumber,
                                    departure:tripFlights[0].departure,
                                    departuretime:tripFlights[0].departuretime,
                                    departuredate: searchflights[2].tripValue === 'Return' ?searchdate.slice(0,11):searchdate,
                                    departureairport:tripFlights[0].departureairport,
                                    departurecode:tripFlights[0].departurecode,
                                    destination:tripFlights[0].destination,
                                    destinationtime:tripFlights[0].destinationtime,
                                    destinationairport:tripFlights[0].destinationairport,
                                    destinationcode:tripFlights[0].destinationcode,
                                    rflightname:tripFlights[1].flightname,
                                    rflightnumber:tripFlights[1].flightnumber,
                                    rdeparture:tripFlights[1].departure,
                                    rdeparturetime:tripFlights[1].departuretime,
                                    rdeparturedate:searchdate.slice(14,25),
                                    rdepartureairport:tripFlights[1].departureairport,
                                    rdeparturecode:tripFlights[1].departurecode,
                                    rdestination:tripFlights[1].destination,
                                    rdestinationtime:tripFlights[1].destinationtime,
                                    rdestinationairport:tripFlights[1].destinationairport,
                                    rdestinationcode:tripFlights[1].destinationcode
                        })
                })
                const booked = await response.json()
                if(booked.success){
                    for (let i=0;i<pwcd.length;i++){
                        const psopt = []
                        let bookpass = await fetch(`${host}/api/v1/auth/createpassenger`,{
                        method:'POST',
                        headers:{
                            'Content-type':'application/json',
                            'auth-token':localStorage.getItem('token')
                        },
                        body: JSON.stringify({ 
                                    firstname:pwcd[i].firstname,
                                    lastname:pwcd[i].lastname,
                                    gender:pwcd[i].gender,
                                    nationality:pwcd[i].nationality,
                                    dateofbirth:pwcd[i].dateofbirth,
                                    passport:pwcd[i].passport,
                                    passportexpirydate:pwcd[i].passportexpirydate,
                                    mobilenumber:pwcd[i].mobilenumber,
                                    email:pwcd[i].email,
                                    bookingid:booked.booking._id
                            })
                        })
                        psopt[i] = await bookpass.json()
                        if(psopt[i].passenger.success !== true){
                            setBookingStatus(true)
                        }
                    }
                }
                if(booked.success !== true){
                    setBookingStatus(true)
                }
                if(booked.success && !bookingstatus){
                    localStorage.setItem('BookingID',booked.booking._id)
                }
                localStorage.removeItem('bookingstatus')
                localStorage.setItem('bookingstatus',bookingstatus)
                navigate('/confirmation') 
            }
            else{
                const response = await fetch(`${host}/api/v1/bookflight`,{
                    method:'POST',
                    headers:{
                        'Content-type':'application/json',
                    },
                    body: JSON.stringify({ 
                                    triptype: searchflights[2].tripValue,
                                    tripclass: searchflights[5].passengerClass,
                                    totalprice: totalPrice(),
                                    flightname:tripFlights[0].flightname,
                                    flightnumber:tripFlights[0].flightnumber,
                                    departure: tripFlights[0].departure,
                                    departuretime:tripFlights[0].departuretime,
                                    departuredate: searchdate.slice(0,11),
                                    departureairport:tripFlights[0].departureairport,
                                    departurecode:tripFlights[0].departurecode,
                                    destination:tripFlights[0].destination,
                                    destinationtime:tripFlights[0].destinationtime,
                                    destinationairport:tripFlights[0].destinationairport,
                                    destinationcode:tripFlights[0].destinationcode,
                                    rflightname:tripFlights[1].flightname,
                                    rflightnumber:tripFlights[1].flightnumber,
                                    rdeparture:tripFlights[1].departure,
                                    rdeparturetime:tripFlights[1].departuretime,
                                    rdeparturedate:searchdate.slice(14,25),
                                    rdepartureairport:tripFlights[1].departureairport,
                                    rdeparturecode:tripFlights[1].departurecode,
                                    rdestination:tripFlights[1].destination,
                                    rdestinationtime:tripFlights[1].destinationtime,
                                    rdestinationairport:tripFlights[1].destinationairport,
                                    rdestinationcode:tripFlights[1].destinationcode
                        })
                })
                const booked = await response.json()
                console.log(booked.success)
                if(booked.success){
                    for (var i=0;i<pwcd.length;i++){
                        const psopt = []
                        let bookpass = await fetch(`${host}/api/v1/createpassenger`,{
                        method:'POST',
                        headers:{
                            'Content-type':'application/json',
                        },
                        body: JSON.stringify({ 
                                    firstname:pwcd[i].firstname,
                                    lastname:pwcd[i].lastname,
                                    gender:pwcd[i].gender,
                                    nationality:pwcd[i].nationality,
                                    passport:pwcd[i].passport,
                                    passportexpirydate:pwcd[i].passportexpirydate,
                                    mobilenumber:pwcd[i].mobilenumber,
                                    email:pwcd[i].email,
                                    bookingid:booked.booking._id
                            })
                        })
                        psopt[i] = await bookpass.json()
                        if(psopt[i].passenger.success !== true){
                            console.log(psopt[i].passenger.success)
                            setBookingStatus(true)
                        }
                    }
                }
                else{
                    setBookingStatus(true)
                }
                if(booked.success && !bookingstatus){
                    localStorage.setItem('BookingID',booked.booking._id)
                }
                localStorage.removeItem('bookingstatus')
                localStorage.setItem('bookingstatus',bookingstatus)
                navigate('/confirmation')
            }
   
    }

  return (
    <div className='book-sum-con'>
        <div className='bsc-title'>Trip Summary</div>
        <div className='fpc-con'>
            {/* <div className='ts-header'>
                <div className='ts-title'>Trip summary</div>
            </div> */}
            <div className='ts-body'>
                    {tripFlights.slice(0,searchflights[2].tripValue==='Return'?tripFlights.length:1).map((flight,i)=>{
                    return  <div className='fd-con'>
                                <div className='ts-t-m'>Outbound flight</div>
                                <div className='fd-con-header'>
                                    <div className='ts-i-xl'>{flight.departure}</div>
                                    <div className='ts-arrow'>&#8594;</div>
                                    <div className='ts-i-xl'>{flight.destination}</div>
                                    <div className='ts-i-m ts-t-m-p'>{i === 1?searchdate.slice(14,25):searchflights[2].tripValue==='Return'?searchdate.slice(0,11):searchdate}</div>
                                </div>
                                <div className='fd-con-body'>
                                    <div className='ts-i-m table-h'>Departure</div>
                                    <div className='ts-i-m table-h'></div>
                                    <div className='ts-i-m table-h'>Arrival</div>
                                    <div className='ts-i-m table-h'>Operated by</div>
                                    <div className='ts-i-m table-h'>Class</div>
                                    <div className='ts-i-l-b'>{flight.departuretime+' '+flight.departurecode}</div>
                                    <div></div>
                                    <div className='ts-i-l-b'>{flight.destinationtime+' '+flight.destinationcode}</div>
                                    <div className='ts-i-l'>{flight.flightname}</div>
                                    <div className='ts-i-l'>{searchflights[5].passengerClass}</div>
                                    <div className='ts-i-m'>{flight.departure+', '+flight.departureairport}</div>
                                    <div className='ts-i-m text-center'>Non-stop</div>
                                    <div className='ts-i-m'>{flight.destination+', '+flight.destinationairport}</div>
                                    <div></div>
                                    <div></div>
                                </div>
                            </div>
                    })}
                    <div className='ts-i-xl ts-i-h-p'>Passenger Details</div>
                    <div className='pd-con'>
                        <div className='ts-i-m table-h'>Passenger name</div>
                        <div className='ts-i-m table-h'>Passport</div>
                        <div className='ts-i-m table-h'>Date of birth</div>
                        <div className='ts-i-m table-h'>Type</div>
                        {pwcd.map((element)=>{
                            const {firstname,lastname,passport,dateofbirth,type} = element
                        return  <>
                                    <div className='ts-i-l table-d'>{firstname+' '+lastname}</div>
                                    <div className='ts-i-l table-d'>{passport?passport:'-'}</div>
                                    <div className='ts-i-l table-d'>{dateofbirth}</div>
                                    <div className='ts-i-l table-d'>{type}</div>
                                </>
                        })}
                    </div>
                    <div className='ts-i-xl ts-i-h-p'>Contact Details</div>
                    <div className='cd-con'>
                        <div className='ts-i-m table-h'>Passenger name</div>
                        <div className='ts-i-m table-h'>Type</div>
                        <div className='ts-i-m table-h'>Email</div>
                        <div className='ts-i-m table-h'>Number</div>
                        {pwcd.map((element)=>{
                            if(element.firstname+' '+element.lastname === primarypassenger){
                        return  <>
                                    <div className='ts-i-l'>{element.firstname+' '+element.lastname}</div>
                                    <div className='ts-i-l'>Primary</div>
                                    <div className='ts-i-l'>{element.email}</div>
                                    <div className='ts-i-l'>{element.mobilenumber}</div>
                                </>
                            }
                        })}
                    </div>
            </div>
        </div>
        <div className='bsc-title'>Total price</div>
        <div className='ts-footer'>
                <div className='d-flex justify-content-between'>
                    <div className='ts-i-m'>Trip price</div>
                    <div className='ts-i-m'>INR {totalPrice()}</div>
                </div>
                <div className='ts-i-m'>&#40;{searchflights[5].adultCount?<>{searchflights[5].adultCount} Adult</>:''}{searchflights[5].childCount?<>+{searchflights[5].childCount}Child</>:''}{searchflights[5].infantCount?<>+{searchflights[5].infantCount}Infant</>:''}&#41;</div>
                <div className='pa-con'>
                    <div className='ts-i-l-b'>Payable Amount:</div>
                    <div className='ts-i-l-b'>INR {totalPrice()}</div>
                </div>
        </div>
        <div className='d-flex justify-content-around'>
                    <button onClick={bookandpay} className='prcd-btn'>Book and Pay</button>
                </div>
    </div>
  )
}

export default BookingSummary



