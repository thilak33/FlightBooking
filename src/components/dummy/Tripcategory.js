import React,{useContext} from 'react'
import flightContent from "../context/FlightContext";

const Tripcategory = () => {

    const content = useContext(flightContent)
    const {tripValue, settripValue} = content 

  return (
    <div className="dropdown trip-details-con">
        <div className="trip-details-btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            <div className="trip-placeholder">Trip</div>
            <div className="trip-displayvalue">{tripValue}</div>
        </div>
        <div className="dropdown-menu trip-select-con">
            <div className="trip-item" onClick={()=> settripValue('One way')}>One-way</div>
            <div className="trip-item" onClick={()=> settripValue('Return')}>Return</div>
        </div>
    </div>
  )
}

export default Tripcategory