import React,{ useState,useContext,useEffect} from 'react'
import "../styles/Navbar.css";
import flightContent from "../context/FlightContext";
import { Link, useNavigate } from "react-router-dom";
import * as moment from 'moment';

const Navbar = () => {
  const content = useContext(flightContent)
  const { setSearch,search, searchflights,
          searchdate,getUsersdata, updateSearchFlights,setCondition
        } = content 
  const navigate = useNavigate();
  const [user,setUser] = useState({})

  const logoutHandle = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }
  const home = () => {
    setSearch('false')
    let sf = JSON.parse(localStorage.getItem('searchflights'))
    if(sf[2].tripValue === 'One-way'){
      updateSearchFlights(3,moment(sf[3]))
      navigate('/')
    }
    if(sf[2].tripValue === 'Return'){
      let startDate = moment(sf[4].startDate)
      let endDate = moment(sf[4].endDate)
      updateSearchFlights(4,{startDate,endDate})
      navigate('/')
    }
  }
  const Modifyserach = () => {
      setSearch('false')
      let sf = JSON.parse(localStorage.getItem('searchflights'))
      setCondition(0)
      if(sf[2].tripValue === 'One-way'){
        updateSearchFlights(3,moment(sf[3]))
        navigate('/')
      }
      if(sf[2].tripValue === 'Return'){
        let startDate = moment(sf[4].startDate)
        let endDate = moment(sf[4].endDate)
        updateSearchFlights(4,{startDate,endDate})
        navigate('/')
      }
  }
  const userIcon = () => {
    if(localStorage.getItem('token')){
      if(user.firstname && user.lastname){
        const data = user.firstname.charAt(0).toUpperCase()+user.lastname.charAt(0).toUpperCase()
        return data
      }
    }
  }

  useEffect(() => {
    if(localStorage.getItem('token')){
      const controller = new AbortController();
      const signal = controller.signal;
      getUsersdata(localStorage.getItem('token'),signal)
      .then((data)=>{setUser(data.user)})
      .catch(err=>{
          if(err.name === "AbortError"){
          console.log('aborted')
          }
      })
      return () => {
          controller.abort();
      }
    }
}, [localStorage.getItem('token')])
  return (
    <>
    <nav className="navbar navbar-expand-lg  header">
      <div className="container-fluid">
        <div onClick={home} className="navbar-brand" >TV-flights</div>
        <div className={`${search === 'true'?'d-block':'d-none'}`}>
          <div className="search-display">
            <div className="place-con">
                <div className="s-d-item">{searchflights[0].departurecode}</div>
                <div>{searchflights[2].tripValue==='Return'?<>&#8596;</>:<>&#8594;</>}</div>
                <div className="s-d-item">{searchflights[1].arrivalcode}</div>
            </div>
            <div className="date-con">
              <div className="s-d-item">{searchdate}</div>
            </div>
            <div className="pass-con">
              <div className="s-d-item">{searchflights[5].passengerCount} passenger</div>
            </div>
            <div className="modify-search-con">
              <div className="s-d-item" onClick={Modifyserach} >Modify search</div>
            </div>
          </div>
        </div>
        <div className="h-auth">{!localStorage.getItem('token')?
          <div>
            <Link to="/login" className="h-auth-btn h-login">Login</Link>
            <Link to="/register" className="h-auth-btn h-register">Register</Link>
          </div>:
          <div className="dropdown myprofile-con">
            <div className="myprofile-btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              <div className="myprofile-displayvalue">
                {localStorage.getItem('token')?userIcon():'User'}
              </div>
            </div>
            <div className="dropdown-menu dropdown-menu-end my-profile-select-con">
              <div className="my-profile-item"><Link to='/dashboard' >Dashboard</Link></div>
              <div onClick={logoutHandle} className="my-profile-item" >Log out</div>
            </div>
          </div>
                }
        </div>
      </div>
    </nav>
    </>
  );
};

export default Navbar;
