import React,{useContext,useState} from 'react';
import "../styles/Home.css";
import flightContent from "../context/FlightContext";


const Destination  = () => {
    const content = useContext(flightContent)
    const {departure, setDeparture, setArrival, arrival, filter, filterDest, onChangeDeparture, onChangeArrival} = content 
    const [placeholder, setPlaceholder] = useState({"from":"dnone", "to":"dnone"})
    const [height,setHeight] = useState({"from":"ihide", "to":"ihide"})
  return (

    <div className="desti-con d-flex">
    <div className="dropdown da-select departure-select">
        <div className='dropdown-toggle da-dropdown-btn departure-drop-btn' data-bs-toggle="dropdown" aria-expanded="false">
            <div className={`da-placeholder ${placeholder.from}`}>From</div>
            <div>
                <input className={`departure-input da-input ${height.from}`} 
                  onFocus={(e)=> {
                      if(!e.target.value){
                          e.target.placeholder="" 
                          setPlaceholder({...placeholder,"from":"dblock"})
                          setHeight({...height,"from":"ishow"})
                      }
                    }
                  } 
                  onBlur={(e)=> {
                          // let regex =/^[a-zA-Z]{1,}$/.test(departure)
                          // setAlert({...alert,"lastname":regex})
                          if(e.target.value === ''){
                              e.target.placeholder="From"
                              setPlaceholder({...placeholder,"from":"dnone"})
                              setHeight({...height,"from":"ihide"})
                          }
                      }
                  }  
                  placeholder="From" onChange={onChangeDeparture}  value={departure} type="text"  name="from"  required/>
            </div>
        </div>
      <div className="dropdown-menu ad-options">{ filter.map((element)=> { 
        return  <div key={element.id} className='departure-item' onClick={(e) => {  e.preventDefault()
         setDeparture(element.id)
         filterDest('')}} >
                    <div  className='d-flex justify-content-between align-items-center'>
                        <div className='d-city'>{element.city}</div>
                        <div className='d-code'>{element.id}</div>
                    </div>
                    <div className='d-flex justify-content-between align-items-center'>
                        <div className='d-country'>{element.country}</div>
                        <div className='d-name'>{element.name}</div>
                    </div>
                </div> }) }
      </div>
    </div>
    <div className="dropdown da-select arrival-select">
        <div className='dropdown-toggle da-dropdown-btn' data-bs-toggle="dropdown" aria-expanded="false">
            <div className='da-placeholder'>To</div>
            <div>
            <input className="arrival-input da-input" onChange={onChangeArrival} type="text" value={arrival}  name="to" required />
            </div>
        </div>
      <div className="dropdown-menu ad-options">{ filter.map((element)=> { 
        return  <div key={element.id} className='departure-item' onClick={(e) => {  e.preventDefault()
         setArrival(element.id)
         filterDest('')}} >
                    <div className='d-flex justify-content-between align-items-center'>
                        <div className='d-city'>{element.city}</div>
                        <div className='d-code'>{element.id}</div>
                    </div>
                    <div className='d-flex justify-content-between align-items-center'>
                        <div className='d-country'>{element.country}</div>
                        <div className='d-name'>{element.name}</div>
                    </div>
                </div> }) }
      </div>
    </div>
                        {/* <div className='d-flex'>
                            <div>
                                <div className={`pd-input-item ${alertborder.mobilenumber}`}>
                                    <div className={`pd-placeholder ${placeholder.mobilenumber}`}>Mobile number</div>
                                    <input className={`mobilenumber-input pd-input ${height.mobilenumber}`} 
                                        onFocus={(e)=> {
                                            if(!e.target.value){
                                                e.target.placeholder="" 
                                                setPlaceholder({...placeholder,"mobilenumber":"dblock"})
                                                setHeight({...height,"mobilenumber":"ishow"})
                                            }
                                        }
                                    } 
                                    onBlur={(e)=> {
                                        let regex =/^[0-9]{10,}$/.test(contactdetails.mobilenumber)
                                        setAlert({...alert,"mobilenumber":regex})
                                        regex?setAlertborder({...alertborder,"mobilenumber":''}):setAlertborder({...alertborder,"mobilenumber":'alert-border'})
                                            if(e.target.value === ''){
                                                e.target.placeholder="Mobile number"
                                                setPlaceholder({...placeholder,"mobilenumber":"dnone"})
                                                setHeight({...height,"mobilenumber":"ihide"})
                                            }
                                        }
                                    } 
                                    placeholder='Mobile number' onChange={onChangecd}  value={contactdetails.mobilenumber} type="text"  name="mobilenumber" id="mobilenumber" disabled={user.mobilenumber}/>
                                </div>
                                {alert.mobilenumber === false?<Alert error={"Please enter a valid Mobile number"}/>:<></>}
                            </div>
                            <div>
                                <div className={`pd-input-item ${alertborder.email}`}>
                                    <div className={`pd-placeholder ${placeholder.email}`}>Email</div>
                                    <input className={`lname-input pd-input ${height.email}`} 
                                    onFocus={(e)=> {
                                            if(!e.target.value){
                                                e.target.placeholder="" 
                                                setPlaceholder({...placeholder,"email":"dblock"})
                                                setHeight({...height,"email":"ishow"})
                                            }
                                        }
                                    } 
                                    onBlur={(e)=> {
                                            let ed = /@/.test(contactdetails.email)
                                            setAlert({...alert,"email":ed})
                                            ed?setAlertborder({...alertborder,"email":''}):setAlertborder({...alertborder,"email":'alert-border'})
                                            if(e.target.value === ''){
                                                e.target.placeholder="Email"
                                                setPlaceholder({...placeholder,"email":"dnone"})
                                                setHeight({...height,"email":"ihide"})
                                            }
                                        }
                                    } 
                                    placeholder='Email' onChange={onChangecd}  value={contactdetails.email} type="text"  name="email" id="email" disabled={user.email}/>
                                </div>
                                {alert.email === false?<Alert error={"Please enter a valid email"}/>:<></>}
                            </div>
                        </div> */}
    </div>
  )
}
  
export default Destination
