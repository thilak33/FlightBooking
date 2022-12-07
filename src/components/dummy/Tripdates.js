import React,{useContext} from 'react'
import flightContent from "../context/FlightContext";

const Tripdates = () => {
    const content = useContext(flightContent)
    const {tripValue, departDate, setdepartDate} = content 

  return (
    <div className="date-select-con d-flex">
      <div className="depart date-select-item">
          <div className="date-placeholder">Depart</div>
          <input className="date-displayvalue departure" value={departDate} onChange={(e) => setdepartDate(e.target.value)} type="date" id="departure" name="departure"></input>
      </div>
      {tripValue === 'Return'? <div className="return date-select-item">
        <div className="date-placeholder">Return</div>
        <input className="date-displayvalue arrival" type="date" id="return" name="return"></input>
      </div>:<div></div>}
    </div>
  )
}

export default Tripdates