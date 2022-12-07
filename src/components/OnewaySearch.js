import React,{useState,useContext,useEffect} from 'react'
import Flightitem from "./Flightitem";
import flightContent from "../context/FlightContext";
import '../styles/Search.css'
import { useNavigate } from 'react-router-dom';
import * as moment from 'moment';


const OnewaySearch = () => {
    const content = useContext(flightContent)
    const { flights, getFlights, setFlights, searchdate,
            setSearch, searchflights, setSearchFlights,setSearchDate,updateSearchFlights,historyobject,setHistoryobject
          } = content 
    const navigate = useNavigate()
    useEffect(() => {
        setSearch('true')
        setSearchDate(localStorage.getItem('searchdate'))
        setSearchFlights(JSON.parse(localStorage.getItem('searchflights')))
        let sf =  JSON.parse(localStorage.getItem('searchflights'))
        const controller = new AbortController();
        const signal = controller.signal;
        if(sf[0].departurecode && sf[1].arrivalcode){
            getFlights(sf[0].departurecode,sf[1].arrivalcode,sf[5].passengerClass.toLowerCase(),signal)
            .then((data)=>{setFlights(data.flights)})
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

    const [isOSBackButtonClicked, setIsOSBackButtonClicked] = useState(false)
    const navigateToHome = (e) => {
      e.preventDefault();
      if(!isOSBackButtonClicked){
            let sf = JSON.parse(localStorage.getItem('searchflights'))
            if(sf[2].tripValue === 'One-way'){
                updateSearchFlights(3,moment(sf[3]))
                setIsOSBackButtonClicked(true)
                navigate('/')
            }
                if(sf[2].tripValue === 'Return'){
                let startDate = moment(sf[4].startDate)
                let endDate = moment(sf[4].endDate)
                updateSearchFlights(4,{startDate,endDate})
                setIsOSBackButtonClicked(true)
                navigate('/')
            }   
            navigate('/')
      }
    }
    useEffect(() => {
        // setHistoryobject(...historyobject,window.location.pathname)
        window.history.pushState(historyobject, null, window.location.pathname);
        window.addEventListener('popstate', navigateToHome);
      });

  return (
    <div className="flight-item-con">
        <div>{searchflights[2].tripValue === 'Return'?searchdate.slice(0,11):searchdate}</div>
        <div className='flight-item-title'>
            Select your departure flight
            <div>from <span>{searchflights[0].departure}</span> to <span>{searchflights[1].arrival}</span></div> 
        </div>
        {flights.map((flight) => {
            return <Flightitem key={flight._id} flight={flight}/>
        })}
    </div>
  )
}

export default OnewaySearch