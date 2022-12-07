import React,{useState,useContext,useEffect} from "react";
import flightContent from "../context/FlightContext";
import { useNavigate } from "react-router-dom";
import 'react-dates/initialize';
import { DateRangePicker,SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import "../styles/Home.css";
import Mutlialert from "./Mutlialert";

const Home = () => {
  const host = "http://localhost:4000"
  var navigate = useNavigate()
  const [multialert,setMultiAlert] = useState({
    departurealert:'',
    arrivalalert:'',
    success:false
  })

  // Departure-arrival
  const content = useContext(flightContent)
  const {  departfilter, arrivalfilter, setDepartFilter, setArrivalFilter, filterDest, setSearch, setFetchPassenger, setFetchBooking,
          searchflights, updateSearchFlights, searchdate, setSearchDate , passarray, pdinitial,
          setSearchFlights
        } = content 


  

  const [focus, setFocus] = useState(null);


  const onChangeDeparture = (e) => {
    updateSearchFlights(0,{'departuredisplay':e.target.value})
    filterDest(e.target.value,'departure')
  }
  const onChangeArrival = (e) => {
    updateSearchFlights(1,{'arrivaldisplay':e.target.value})
    filterDest(e.target.value,'arrival')
  }
  const onDateChange = (element) => {
    updateSearchFlights(3,element)
    var date = new Date(JSON.stringify(element).slice(1,11))
    var tostring = date.toDateString()
    var stringdate = tostring.split(' ')
    setSearchDate(stringdate[0]+', '+stringdate[1]+' '+stringdate[2])
  }
  const handleOnDateChange = ({startDate,endDate}) =>{  
    updateSearchFlights(4,{startDate,endDate})
    var date1 = new Date(JSON.stringify({startDate,endDate}).slice(14,24))
    var tostring1 = date1.toDateString()
    var stringdate1 = tostring1.split(' ')
    var date2 = new Date(JSON.stringify({startDate,endDate}).slice(51,61))
    var tostring2 = date2.toDateString()
    var stringdate2 = tostring2.split(' ')
    setSearchDate(stringdate1[0]+', '+stringdate1[2]+' '+stringdate1[1]+' - '+stringdate2[0]+', '+stringdate2[2]+' '+stringdate2[1])

  }
  const [calendarFocused, setCalendarFocus] = useState(false);  
  const onCalendarFocusChange = (focused) => {
    setCalendarFocus(focused)
  };
  const handleRadioClass = (event) => {
    updateSearchFlights(5,{...searchflights[5],'passengerClass':event.target.value})
  } 

  
  const SearchFlights = () => {
    if(searchflights[0].departure && searchflights[1].arrival && searchdate){
        passarray.splice(0,passarray.length)
        pdinitial.splice(0,pdinitial.length)
        localStorage.removeItem('Searchdetails')
        localStorage.setItem('Searchdetails',JSON.stringify(searchflights))
        for(let i=0; i<searchflights[5].adultCount; i++){
            passarray.push('Adult')
            pdinitial.push({
              'passengernumber':i+1,
              'firstname':'',
              'lastname':'',
              'dateofbirth':'',
              'nationality':'',
              'gender':'',
              'passport':'',
              'expirydate':'',
              'type':'Adult',
              'mobilenumber':NaN,
              'email':''
            })
        }
        for(let i=0; i<searchflights[5].childCount; i++){
            passarray.push('Child')
            pdinitial.push({
              'passengernumber':searchflights[5].adultCount+i+1,
              'firstname':'',
              'lastname':'',
              'dateofbirth':'',
              'nationality':'',
              'gender':'',
              'passport':'',
              'expirydate':'',
              'type':'Child',
              'mobilenumber':NaN,
              'email':''
            })
        }
        for(let i=0; i<searchflights[5].infantCount; i++){
            passarray.push('Infant')
            pdinitial.push({
              'passengernumber':searchflights[5].adultCount+searchflights[5].childCount+i+1,
              'firstname':'',
              'lastname':'',
              'dateofbirth':'',
              'nationality':'',
              'gender':'',
              'passport':'',
              'expirydate':'',
              'type':'Infant',
              'mobilenumber':NaN,
              'email':''
            })
        }
        localStorage.removeItem('passarray')
        localStorage.removeItem('pdinitial')
        localStorage.setItem('passarray',JSON.stringify(passarray))
        localStorage.setItem('pdinitial',JSON.stringify(pdinitial))
        localStorage.removeItem('searchflights')
        localStorage.setItem('searchflights',JSON.stringify(searchflights))
        localStorage.setItem('searchdate',searchdate)
        navigate('/owsearch')
    }
    else{
      if(searchflights[0].departure === ''){
        setMultiAlert({...multialert,departurealert:'Departure airport is missing'})
      }
      if(searchflights[1].arrival === ''){setMultiAlert({...multialert,'arrivalalert':'Destination airport is missing'})}
        setMultiAlert({...multialert,success:true})
    }
  }


// Retrive Booking

  const[retrivebooking,setRetriveBooking] = useState({mytlname:'',bookingid:''})

  const onRetriveBooking = (e) =>{
      setRetriveBooking({...retrivebooking,[e.target.name]:e.target.value})
  }
  const retriveBooking = async() =>{
      const response = await fetch(`${host}/api/v1/myflight?_id=${retrivebooking.bookingid}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
      });
      const pbdata = await response.json()
      if(pbdata.success){
          setFetchBooking(pbdata.flights)
          const response = await fetch(`${host}/api/v1/getpassofbook?_id=${retrivebooking.bookingid}`,{
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              }
          })
          const bpdata = await response.json()
          console.log(bpdata)
          if(bpdata.success){
              setFetchPassenger(bpdata.passenger)
              navigate('/fetchbooking')
          }
      }
  }


  useEffect(() => {
    setSearch(false)
    // console.log('hi')
    // if(searchflights[3]){
    //     let sf = JSON.parse(localStorage.getItem('searchflights'))
    //     console.log(moment(sf[3]))
    //     updateSearchFlights(3,moment(sf[3]))
    // }

    // setDeparture(localStorage.getItem('departure'))
    // setArrival(localStorage.getItem('destination'))

  }, [])
  return (
    <>
      <div className="d-flex justify-content-center">
        <div className="home-con">
          <div className="nav nav-tabs hc-nav" id="myTab" role="tablist">
            <div className="nav-item home-tab-head " role="presentation">
              <div
                className="home-th-item home-th-item-l nav-link active"
                id="home-tab"
                data-bs-toggle="tab"
                data-bs-target="#home"
                role="tab"
                aria-controls="home"
                aria-selected="true">
                Book
              </div>
            </div>
            <div className="nav-item home-tab-head" role="presentation">
              <div
                className="home-th-item home-th-item-r nav-link"
                id="profile-tab"
                data-bs-toggle="tab"
                data-bs-target="#profile"
                role="tab"
                aria-controls="profile"
                aria-selected="false">
                My trips
              </div>
            </div>
          </div>
          <div className="tab-content" id="myTabContent">
            <div
              className="home-tabs tab-pane fade show active"
              id="home"
              role="tabpanel"
              aria-labelledby="home-tab">
              <form className="search-flights-form">
                {multialert.success ? <Mutlialert multialert={multialert} /> : <></>}
                <div className="f-q-container  d-flex">
                  {/* to and from */}
                  <div className="desti-con d-flex">
                    <div className="dropdown da-select departure-select">
                      <div
                        className="dropdown-toggle da-dropdown-btn departure-drop-btn"
                        data-bs-toggle="dropdown"
                        aria-expanded="false">
                        <div className="form-floating">
                          <input
                            className={`da-input da-input-l form-control `}
                            type="text"
                            onChange={onChangeDeparture}
                            value={searchflights[0].departuredisplay}
                            name="from"
                            id="from"
                            placeholder="From"
                            // onBlur={() => {
                            //   // let regex =/^[a-zA-Z]{1,}$/.test(personaldetails.expirydate)
                            //   // setAlert({...alert,"expirydate":regex})
                            //   // setInvalid({...invalid,'expirydate':regex?'':'is-invalid'})
                            // }}
                          />
                          <label className="da-input-label" htmlFor="from">
                            From
                          </label>
                        </div>
                      </div>
                      <div className="dropdown-menu da-options">
                        {departfilter.map((element) => {
                          return (
                            <div
                              key={element.id}
                              className="departure-item"
                              onClick={(e) => {
                                e.preventDefault();
                                updateSearchFlights(0,{...searchflights[0],'departure':element.city,'departurecode':element.id,'departuredisplay':element.city+' '+element.id})
                                filterDest(element.city,'departure')
                                // filterDest("");
                              }}>
                              <div className="d-flex justify-content-between align-items-center">
                                <div className="d-city">{element.city}</div>
                                <div className="d-code">{element.id}</div>
                              </div>
                              <div className="d-flex justify-content-between align-items-center">
                                <div className="d-country">
                                  {element.country}
                                </div>
                                <div className="d-name">{element.name}</div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="dropdown da-select departure-select">
                      <div
                        className="dropdown-toggle da-dropdown-btn departure-drop-btn"
                        data-bs-toggle="dropdown"
                        aria-expanded="false">
                        <div className="form-floating">
                          <input
                            className={`da-input da-input-r form-control `}
                            type="text"
                            onChange={onChangeArrival}
                            value={searchflights[1].arrivaldisplay}
                            name="to"
                            id="to"
                            placeholder="To"
                            // on={() => {
                            //   // let regex =/^[a-zA-Z]{1,}$/.test(personaldetails.expirydate)
                            //   // setAlert({...alert,"expirydate":regex})
                            //   // setInvalid({...invalid,'expirydate':regex?'':'is-invalid'})
                            // }}
                          />
                          <label className="da-input-label" htmlFor="to">
                            To
                          </label>
                        </div>
                      </div>
                      <div className="dropdown-menu da-options">
                        {arrivalfilter.map((element) => {
                          return (
                            <div
                              key={element.id}
                              className="departure-item"
                              onClick={(e) => {
                                e.preventDefault();
                                // setArrival(element.city + "-" + element.id);
                                updateSearchFlights(1,{...searchflights[1],'arrival':element.city,'arrivalcode':element.id,'arrivaldisplay':element.city+' '+element.id})
                                filterDest(element.city,'arrival')
                              }}>
                              <div className="d-flex justify-content-between align-items-center">
                                <div className="d-city">{element.city}</div>
                                <div className="d-code">{element.id}</div>
                              </div>
                              <div className="d-flex justify-content-between align-items-center">
                                <div className="d-country">
                                  {element.country}
                                </div>
                                <div className="d-name">{element.name}</div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  {/* Trip category */}
                  <div className="dropdown trip-details-con">
                    <div
                      className="trip-details-btn dropdown-toggle"
                      data-bs-toggle="dropdown"
                      aria-expanded="false">
                      <div className="trip-placeholder">Trip</div>
                      <div className="trip-displayvalue">{searchflights[2].tripValue}</div>
                    </div>
                    <div className="dropdown-menu trip-select-con">
                      <div
                        className="trip-item"
                        onClick={() => updateSearchFlights(2,{'tripValue':'One-way'})}>
                        One-way
                      </div>
                      <div
                        className="trip-item"
                        onClick={() => updateSearchFlights(2,{'tripValue':'Return'})}>
                        Return
                      </div>
                    </div>
                  </div>
                  <div className="date-select-con d-flex">
                    {searchflights[2].tripValue === "One-way" ? (
                      <div className="depart date-select-item-d">
                        <div className="date-placeholder">Depart</div>
                        <SingleDatePicker
                          date={searchflights[3]}
                          onDateChange={onDateChange}
                          focused={calendarFocused.focused}
                          onFocusChange={onCalendarFocusChange}
                          id="#123"
                          displayFormat="D MMM YYYY"
                          numberOfMonths={1}
                        />
                      </div>
                    ) : (
                      <div className="return date-select-item-r">
                        <div className="d-flex justify-content-between">
                          <div className="date-placeholder">Depart</div>
                          <div className="date-placeholder dp-r">Return</div>
                        </div>
                        <DateRangePicker
                          startDatePlaceholderText="Depart"
                          startDate={searchflights[4].startDate}
                          onDatesChange={handleOnDateChange}
                          endDatePlaceholderText="Return"
                          endDate={searchflights[4].endDate}
                          numberOfMonths={1}
                          displayFormat="D MMM YYYY"
                          focusedInput={focus}
                          onFocusChange={(focus) => setFocus(focus)}
                          startDateId="startDateMookh"
                          endDateId="endDateMookh"
                          minimumNights={0}
                        />
                      </div>
                    )}
                  </div>
                  {/* showClearDates={true} */}
                  {/* Passenger Count */}
                  <div className="dropdown passengercount-con">
                    <div
                      className="dropdown-toggle pc-dropdown-btn"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      data-bs-auto-close="outside">
                      <div className="pc-placeholder">Passenger / Class</div>
                      <div className="pc-displayvalue">
                        {searchflights[5].passengerCount} Passenger, {searchflights[5].passengerClass}
                      </div>
                    </div>
                    <div className="dropdown-menu pass-class-con">
                      <div className="pass-detail-con">
                        <div className="p-d-heading">Passenger</div>
                        <div className="d-flex justify-content-between">
                          <div className="p-holder">Adult (12years+)</div>
                          <div className="d-flex counter-con">
                            <div
                              className="p-counter"
                              onClick={() => {
                                if (searchflights[5].passengerCount > 1 && searchflights[5].adultCount > 1) {
                                  // setadultCounter(
                                  //   (adultCounter) => adultCounter - 1
                                  // );
                                  updateSearchFlights(5,{...searchflights[5],'adultCount':searchflights[5].adultCount-1,'passengerCount':searchflights[5].passengerCount-1})
                                  // setPassCount((passCount) => passCount - 1);
                                }
                              }}>
                              {" "}
                              -
                            </div>
                            <div className="p-value p-a-value">
                              {searchflights[5].adultCount}
                            </div>
                            <div
                              className="p-counter"
                              onClick={() => {
                                if (searchflights[5].passengerCount < 9) {
                                  // setadultCounter(
                                  //   (adultCounter) => adultCounter + 1
                                  // );
                                  updateSearchFlights(5,{...searchflights[5],'adultCount':searchflights[5].adultCount+1,'passengerCount':searchflights[5].passengerCount+1})
                                  // setPassCount((passCount) => passCount + 1);
                                  // updateSearchFlights(5,{...searchflights[5],'passengerCount':searchflights[5].passengerCount+1})
                                }
                              }}>
                              +
                            </div>
                          </div>
                        </div>
                        <div className="d-flex justify-content-between">
                          <div className="p-holder">Child (2-11 years)</div>
                          <div className="d-flex counter-con">
                            <div
                              className="p-counter"
                              onClick={() => {
                                if (searchflights[5].passengerCount > 1 && searchflights[5].childCount > 0) {
                                  // setchildCounter(
                                  //   (childCounter) => childCounter - 1
                                  // );
                                  // setPassCount((passCount) => passCount - 1);
                                  updateSearchFlights(5,{...searchflights[5],'childCount':searchflights[5].childCount-1,'passengerCount':searchflights[5].passengerCount-1})
                                }
                              }}>
                              -
                            </div>
                            <div className="p-value p-c-value">
                              {searchflights[5].childCount}
                            </div>
                            <div
                              className="p-counter"
                              onClick={() => {
                                if (searchflights[5].passengerCount < 9) {
                                  // setchildCounter(
                                  //   (childCounter) => childCounter + 1
                                  // );
                                  // setPassCount((passCount) => passCount + 1);
                                  updateSearchFlights(5,{...searchflights[5],'childCount':searchflights[5].childCount+1,'passengerCount':searchflights[5].passengerCount+1})
                                }
                              }}>
                              +
                            </div>
                          </div>
                        </div>
                        <div className="d-flex justify-content-between mb-3">
                          <div className="p-holder">Infant (Under 2 years)</div>
                          <div className="d-flex counter-con">
                            <div
                              className="p-counter"
                              onClick={() => {
                                if (searchflights[5].passengerCount > 1 && searchflights[5].infantCount > 0) {
                                  // setinfantCounter(
                                  //   (infantCounter) => infantCounter - 1
                                  // );
                                  // setPassCount((passCount) => passCount - 1);
                                  updateSearchFlights(5,{...searchflights[5],'infantCount':searchflights[5].infantCount-1,'passengerCount':searchflights[5].passengerCount-1})
                                }
                              }}>
                              -
                            </div>
                            <div className="p-value p-i-value">
                              {searchflights[5].infantCount}
                            </div>
                            <div
                              className="p-counter"
                              onClick={() => {
                                if (searchflights[5].passengerCount < 9) {
                                  // setinfantCounter(
                                  //   (infantCounter) => infantCounter + 1
                                  // );
                                  // setPassCount((passCount) => passCount + 1);
                                  updateSearchFlights(5,{...searchflights[5],'infantCount':searchflights[5].infantCount+1,'passengerCount':searchflights[5].passengerCount+1})
                                }
                              }}>
                              +
                            </div>
                          </div>
                        </div>
                        <div className="class-con">
                          <div className="select-radio-con">
                            <div className="form-check select-radio sc-radio-input-c">
                              <div className="d-flex justify-content-between">
                                <label
                                  className="form-check-label select-label"
                                  htmlFor="economy">
                                  Economy
                                </label>
                                <input
                                  className="form-check-input select-input sc-radio-input"
                                  onChange={handleRadioClass}
                                  checked={searchflights[5].passengerClass === "Economy"}
                                  value="Economy"
                                  type="radio"
                                  name="classOptions"
                                  id="ecomomy"
                                />
                              </div>
                            </div>
                            <div className="form-check select-radio sc-radio-input-c">
                              <div className="d-flex justify-content-between">
                                <label
                                  className="form-check-label select-label "
                                  htmlFor="premium">
                                  Premium
                                </label>
                                <input 
                                  className="form-check-input select-input sc-radio-input"
                                  onChange={handleRadioClass}
                                  type="radio"
                                  checked={searchflights[5].passengerClass === "Premium"}
                                  value="Premium"
                                  name="classOptions"
                                  id="premium"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="s-b-con">
                  <button
                    type="button"
                    onClick={SearchFlights}
                    className="search-flights-btn">
                    Search Flights
                  </button>
                </div>
              </form>
            </div>
            <div
              className="tab-pane fade"
              id="profile"
              role="tabpanel"
              aria-labelledby="profile-tab">
              <div className="my-trips-con">
                <div className="form-floating">
                  <input
                    className={`rbd-input rbd-input-l  form-control `}
                    type="text"
                    onChange={onRetriveBooking}
                    value={retrivebooking.lastname}
                    name="mytlname"
                    id="mytlname"
                    placeholder="Lastname"
                    onBlur={() => {
                      // let regex =/^[a-zA-Z]{1,}$/.test(personaldetails.expirydate)
                      // setAlert({...alert,"expirydate":regex})
                      // setInvalid({...invalid,'expirydate':regex?'':'is-invalid'})
                    }}
                  />
                  <label className="rbd-input-label" htmlFor="mytlname">
                    Lastname
                  </label>
                </div>
                <div className="form-floating">
                  <input
                    className={`rbd-input rbd-input-r form-control `}
                    type="text"
                    onChange={onRetriveBooking}
                    value={retrivebooking.bookingid}
                    name="bookingid"
                    id="mytbid"
                    placeholder="Booking ID"
                    onBlur={() => {
                      // let regex =/^[a-zA-Z]{1,}$/.test(personaldetails.expirydate)
                      // setAlert({...alert,"expirydate":regex})
                      // setInvalid({...invalid,'expirydate':regex?'':'is-invalid'})
                    }}
                  />
                  <label className="rbd-input-label" htmlFor="mytbid">
                    Booking ID
                  </label>
                </div>
                <button onClick={retriveBooking} className="rbd-btn">
                  Retrive Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
