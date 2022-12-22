import React from 'react'
import "../styles/Navbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from '.././context/Auth'
import { useFlight } from '../context/Flight';

const Navbar = () => {

  const { searchflights } = useFlight()


  const {auth, setAuth} = useAuth()
  const navigate = useNavigate()
  const location = useLocation()




  const logoutHandle = () => {
    setAuth({ ...auth, user: null, token: '' })
    localStorage.removeItem('auth');
    navigate('/login');
  }

  const home = () => {
    // setSearch('false')
    navigate('/')
  }
  const Modifyserach = () => {
    navigate('/')
  }
  const userIcon = () => {
    if (auth) {
      if (auth.user?.firstname && auth.user?.lastname) {
        const data = auth.user.firstname.charAt(0).toUpperCase() + auth.user.lastname.charAt(0).toUpperCase()
        return data
      }
    }
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg  header">
        <div className="container-fluid">
          <div onClick={home} className="navbar-brand" >Eco-flights</div>
          <div className={`${location.pathname.includes('/owsearch') || location.pathname.includes('/rsearch') ? 'd-block' : 'd-none'}`}>
            <div className="search-display">
              <div className="place-con">
                <div className="s-d-item">{searchflights[0].departurecode}</div>
                <div>
                  {searchflights[2].tripValue === 'Return' ? 
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="navbar-icon bi bi-arrow-left-right" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M1 11.5a.5.5 0 0 0 .5.5h11.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 11H1.5a.5.5 0 0 0-.5.5zm14-7a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H14.5a.5.5 0 0 1 .5.5z" />
                  </svg> 
                  : 
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="navbar-icon bi bi-arrow-right" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                  </svg>
                  }
                </div>
                <div className="s-d-item">{searchflights[1].arrivalcode}</div>
              </div>
              <div className="date-con">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="navbar-icon bi bi-calendar" viewBox="0 0 16 16">
                  <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                </svg>
                <div className="s-d-item">
                  {searchflights[2].tripValue === 'Return' ?searchflights[4].departuredate+' - '+searchflights[4].destinationdate:searchflights[3].departuredate}
                </div>
              </div>
              <div className="pass-con">
                <div className="s-d-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="navbar-icon bi bi-people-fill" viewBox="0 0 16 16">
                    <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                  </svg>
                  {searchflights[5].passengerCount} passenger
                </div>
              </div>
              <div className="modify-search-con">
                <div className="s-d-item" onClick={Modifyserach} >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="navbar-icon bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                  </svg> 
                   Modify search
                </div>
              </div>
            </div>
          </div>
          <div className="h-auth">{!auth.user ?
            <div>
              <Link to="/login" className="h-auth-btn h-login">Login</Link>
              <Link to="/register" className="h-auth-btn h-register">Register</Link>
            </div> :
            <div className="dropdown myprofile-con">
              <div className="myprofile-btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                <div className="myprofile-displayvalue">
                  {auth.user ? userIcon() : 'User'}
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
