import React,{useContext,useEffect,useState} from 'react'
import Flightitem from "./Flightitem";
import flightContent from "../context/FlightContext";
import { useNavigate } from 'react-router-dom';


const ReturnSearch = () => {
    const [showElement,setShowElement] = useState(true)
    const content = useContext(flightContent)
    const { getFlights, setSearch, rflights, setRflights,setTripFlights,
            searchflights,searchdate , setSearchFlights,setSearchDate,
            setCondition,historyobject
          } = content 
    const navigate = useNavigate()
    useEffect(() => {
        setSearch('true')
        setSearchDate(localStorage.getItem('searchdate'))
        setSearchFlights(JSON.parse(localStorage.getItem('searchflights')))
        let sf =  JSON.parse(localStorage.getItem('searchflights'))
        const controller = new AbortController();
        const signal = controller.signal;
        getFlights(sf[1].arrivalcode,sf[0].departurecode,sf[5].passengerClass.toLowerCase(),signal)
        .then((data)=>{setRflights(data.flights)})
        .catch(err=>{
            if(err.name === "AbortError"){
            console.log('aborted')
            }
        })
        return () => {
            controller.abort();
        }
    }, [])
    const undoSelection = () => {
        setTripFlights('')
        navigate('/owsearch')
    }
    useEffect(()=>{
        setTimeout(function() {
          setShowElement(false)
             }, 5000);
           },
       [])

       const [isRSBackButtonClicked, setIsRSBackButtonClicked] = useState(false)
       const navigateToOWsearch = (e) => {
         e.preventDefault();
         if(!isRSBackButtonClicked){
            setIsRSBackButtonClicked(true)
            setCondition(0)
            navigate('/owsearch')
         }
       }
       useEffect(() => {
           window.history.pushState(historyobject, null, window.location.pathname);
           window.addEventListener('popstate', navigateToOWsearch);
         });

  return (
    <div className="flight-item-con">
        <div>{searchflights[2].tripValue === 'Return'?searchdate.slice(14,25):searchdate}</div>
        <div className='flight-item-title'>
            Select your departure flight
            <div>from <span>{searchflights[1].arrival}</span> to <span>{searchflights[0].departure}</span></div> 
        </div>
        {rflights.map((flight) => {
            return <Flightitem key={flight._id} flight={flight}/>
        })}
        <div className='d-flex justify-content-center'>
        {showElement?<div className='undo-alert-con'>
                        <div>Departure selected</div>
                        <div onClick={undoSelection} >Undo selection</div>
                    </div>
                    :<></>
        }
        </div>
    </div>
  )
}

export default ReturnSearch