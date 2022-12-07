import React, { useContext, useState, useEffect } from 'react'
import '../styles/Passengerdetails.css'
import flightContent from "../context/FlightContext";
import Alert from './Alert';
import { useNavigate } from 'react-router-dom';
const Passengerdetails = () => {


    let navigate = useNavigate()
    const content = useContext(flightContent)
    const { personaldetails, setPersonaldetials, contactdetails, setContactdetails,
        tripFlights, localpassengers, localpassenger, setLocalPassenger,
        getPassengers, passarray, setPassarray, updatePassengerDetails,
        searchflights, setSearchFlights,  setLocalPassengers, primarypassenger, setPrimarypassenger,
        setPwcd, setTripFlights,setCondition,historyobject
    } = content

    const [invalid, setInvalid] = useState({})
    const [selected, setSelected] = useState('');
    const [alert, setAlert] = useState({})

    const Capitalize = (str) =>{
        return str.charAt(0).toUpperCase() + str.slice(1);
        }
    
    const onChangepd = (e) => {
        setPersonaldetials({ ...personaldetails, [e.target.name]: Capitalize(e.target.value) })
    }
    const onChangecd = (e) => {
        setContactdetails({ ...contactdetails, [e.target.name]: e.target.value })
    }
    const handleRadio = (e) => {
        setPersonaldetials({ ...personaldetails,'gender': e.target.value })
    }



    // Passenger drop-down
    const [pselected, setPselected] = useState("Select passenger");
    const onCP = (e) => {
        setPselected(e.target.getAttribute('data-value'))
        dbpassengers.forEach((element) => {
            if (element.firstname+' '+element.lastname === e.target.getAttribute('data-value')) {
                setPersonaldetials({
                    ...personaldetails, "firstname": element.firstname,
                    "lastname": element.lastname,
                    "nationality": element.nationality,
                    "dateofbirth":element.dateofbirth,
                    'gender': element.gender
                })
            }
        })
    }

    const onSP = (e) => {
        setPrimarypassenger(e.target.getAttribute('data-value'))
    }

    const onSetPP = () =>{
        if(passvalidation) {
            updatePassengerDetails(passengernum, localpassenger)
        }
    }

    // Passenger validation alerts




    //  Passengers validation and accordion for mutliple passenger

    const [passvalidation, setPassvalidation] = useState(false)
    const [erroraccord, setErroraccord] = useState({})
    const [adddetails, setAdddetails] = useState([true])
    const [editdetails, setEditdetails] = useState([])
    const [passengernum, setPassengernum] = useState(0)

    const addDeatilsClick = (e) => {
        console.log(e.target.getAttribute('data-value'))
        if (!passvalidation) {
            setErroraccord({ ...erroraccord, [e.target.getAttribute('data-value')]: true })
            pdvalidationcheck()
        }
        if (passvalidation) {
            console.log('add', adddetails)
            setErroraccord({ ...erroraccord, [e.target.getAttribute('data-value')]: false })
            setAdddetails({ ...adddetails, [e.target.getAttribute('data-value')]: true })
            setEditdetails({ ...editdetails, [e.target.getAttribute('data-value')]: false, [passengernum]: true })
            // localpassengers[passengernum]= localpassenger
            updatePassengerDetails(passengernum, localpassenger)
            setPassengernum((passengernum) => Number(e.target.getAttribute('data-value')))
            setPassvalidation(false)
            setPersonaldetials(
                {
                    ...personaldetails,
                    firstname: '',
                    lastname: '',
                    dateofbirth: '',
                    nationality: '',
                    gender:'',
                    passport:'',
                    expirydate:''
                }
            )

        }
    }

    const editDetailsClick = (e) => {
        console.log(e.target.getAttribute('data-value'))
        if (!passvalidation) {
            setErroraccord({ ...erroraccord, [e.target.getAttribute('data-value')]: true })
            pdvalidationcheck()
        }
        if (passvalidation) {
            console.log('edit', adddetails)
            let value = e.target.getAttribute('data-value')
            setErroraccord({ ...erroraccord, [value]: false })
            setAdddetails({ ...adddetails, [value]: true })
            setEditdetails({ ...editdetails, [value]: false, [passengernum]: true })
            updatePassengerDetails(passengernum, localpassenger)
            setPassengernum((passengernum) => Number(e.target.getAttribute('data-value')))
            setPassvalidation(false)
            setPersonaldetials(
                {
                    ...personaldetails,
                    firstname: localpassengers[value].firstname,
                    lastname: localpassengers[value].lastname,
                    dateofbirth:localpassengers[value].dateofbirth,
                    nationality:localpassengers[value].nationality,
                    gender:localpassengers[value].gender
                }
            )
            localpassengers[value] = ''
        }
    }



    const pdvalidationcheck = () => {
        let efname = /^[a-zA-Z]{1,}$/.test(personaldetails.firstname)
        let elname = /^[a-zA-Z]{1,}$/.test(personaldetails.lastname)
        let enationality = /^[a-zA-Z]{1,}$/.test(personaldetails.nationality)
        let edob = /\d{1,}/g.test(personaldetails.dateofbirth)
        let egender =/^[a-zA-Z]{1,}$/.test(personaldetails.gender)
        setAlert({
            ...alert, "firstname": efname,
            "lastname": elname,
            "nationality": enationality,
            "dateofbirth": edob,
            "gender":egender
        })
        setInvalid({
            ...invalid, 'firstname': efname ? '' : 'is-invalid',
            'lastname': elname ? '' : 'is-invalid',
            'nationality': enationality ? '' : 'is-invalid',
            'dateofbirth': edob ? '' : 'is-invalid',
            'gender':egender? '': 'is-invalid',

        })
    }

    const cdvalidationcheck = () => {
        let pp = primarypassenger.includes('Select Primary Contact')
        let emb = /^[0-9]{10,}$/.test(contactdetails.mobilenumber)
        let email = /@/.test(contactdetails.email)
        setAlert({
            ...alert, "mobilenumber": emb,
            "email":email,
            "primarycontact":!pp
        })
        setInvalid({
            ...invalid, 'mobilenumber': emb ? '' : 'is-invalid',
            'email': email ? '' : 'is-invalid',
            'primarycontact': pp ? '' : 'is-invalid',
        })
    } 

    const updatePWCD = (localpassengers, primarypassenger, contactdetails) => {
        return localpassengers.map(item => {
            var temp = Object.assign({}, item);
            if (temp.firstname+' '+temp.lastname === primarypassenger) {
                temp.mobilenumber = contactdetails.mobilenumber
                temp.email = contactdetails.email
            }
            return temp;
        });
    }

    // Proceed Method
    const proceed = () => {
        pdvalidationcheck()
        if (passvalidation) {
            cdvalidationcheck()
            updatePassengerDetails(passengernum, localpassenger)
            if (contactdetails.mobilenumber && contactdetails.email && primarypassenger !== 'Select Primary Contact') {
                var pin = updatePWCD(localpassengers, primarypassenger, contactdetails);
                setPwcd(pin)
                localStorage.setItem('pwcd',JSON.stringify(pin))
                localStorage.setItem('primarypassenger',primarypassenger)
                navigate('/bookingsummary')
            }
        }
    }
    const [dbpassengers, setDbpassengers] = useState([])



    const [isPDBackButtonClicked, setIsPDBackButtonClicked] = useState(false)

    const navigateToSearch = (e) => {
      e.preventDefault();
      if(!isPDBackButtonClicked){
            if(searchflights[2].tripValue === 'One-way'){
                setIsPDBackButtonClicked(true)
                setCondition(0)
                navigate('/owsearch')
            } 
            if(searchflights[2].tripValue === 'Return'){
                setIsPDBackButtonClicked(true)
                setCondition(1)
                navigate('/rsearch')
            } 
      }
    }
    useEffect(() => {
        setPassarray(JSON.parse(localStorage.getItem('passarray')))
        setLocalPassengers(JSON.parse(localStorage.getItem('pdinitial')))
        setTripFlights(JSON.parse(localStorage.getItem('tripFlights')))
        setSearchFlights(JSON.parse(localStorage.getItem('searchflights')))

        window.history.pushState(historyobject, null, window.location.pathname);
        window.addEventListener('popstate',navigateToSearch);
    }, [])

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        getPassengers(signal)
            .then((data) => { setDbpassengers(data.passenger) })
            .catch(err => {
                if (err.name === "AbortError") {
                    console.log('aborted')
                }
            })
        return () => {
            controller.abort();
        }
    }, [])

    useEffect(() => {
        if (personaldetails.firstname  && personaldetails.lastname  && personaldetails.dateofbirth  && personaldetails.nationality && personaldetails.gender ) {
            setPassvalidation(true)
        }
        else {
            setPassvalidation(false)
        }
        setLocalPassenger({
            ...localpassenger, passengernumber: passengernum,
            firstname: personaldetails.firstname,
            lastname: personaldetails.lastname,
            dateofbirth: personaldetails.dateofbirth,
            nationality: personaldetails.nationality,
            gender: personaldetails.gender,
            passport: personaldetails.passport,
            expirydate: personaldetails.expirydate,
            type: passarray[passengernum],
            mobilenumber:NaN,
            email:''
        })
    }, [personaldetails.firstname, personaldetails.lastname, personaldetails.dateofbirth, personaldetails.nationality, personaldetails.gender,personaldetails.passport, personaldetails.expirydate, selected])

    // useEffect(() => {

    //     if (localStorage.getItem('token')) {
    //         const controller = new AbortController();
    //         const signal = controller.signal;
    //         getUsersdata(localStorage.getItem('token'),signal)
    //             .then((element) => {
    //                 setContactdetails({ ...contactdetails, 'mobilenumber': element.user.mobilenumber, 'email': element.user.email })
    //             })
    //             .catch(err => {
    //                 if (err.name === "AbortError") {
    //                     console.log('aborted')
    //                 }
    //             })
    //         return () => {
    //             controller.abort();
    //         }
    //     }
    // }, [])

    return (
        <div className='passenger-d-con'>
            <div className='pd-title'>Passenger Details</div>
            <div className='d-flex justify-content-between'>
                <div>
                    <div className="accordion open" id="passengerAccordion">
                        {localpassengers.map((element, index) => {
                            return  <>
                                    <div className="accordion-item pass-accord-item">
                                        <div className="pass-accord-header" id={`heading${index}`}  >
                                            <div className='d-flex justify-content-between align-items-center'>
                                                <div className='pd-form-title'>{element.firstname ? element.firstname + element.lastname : <>Passenger {index+1}</>} ({element.type})</div>
                                                {!adddetails[index] ? <div className="cord-add-d-btn" onClick={addDeatilsClick} data-value={index} data-bs-toggle="collapse" data-bs-target={passvalidation ? `#collapse${index}` : ''} aria-expanded='true' aria-controls={`collapse${index}`}>Add details</div> : <></>}
                                                {element.firstname && editdetails[index] ? <div className="cord-add-d-btn" onClick={editDetailsClick} data-value={index} data-bs-toggle="collapse" data-bs-target={passvalidation ? `#collapse${index}` : ''} aria-expanded='true' aria-controls={`collapse${index}`}>Edit Details</div> : <></>}
                                            </div>
                                        </div>
                                        <div className='next-stp-con'>
                                            {erroraccord[index] ? <div className='next-step-alert'>Please complete the details of the remaining passengers in your booking to continue to the next step.</div> : <></>}
                                        </div>
                                        <div id={`collapse${index}`} className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`} aria-labelledby={`heading${index}`} data-bs-parent="#passengerAccordion">
                                            <div className="accordion-body pass-accord-body">
                                                <form className='pd-form'>
                                                    <div>{localStorage.getItem('token') ?
                                                        <div className="dropdown">
                                                            <button className="dbpass-btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                                <div>{pselected}</div><div className='arrow down'></div>
                                                            </button>
                                                            <div className="dropdown-menu dbpass-dd-menu">
                                                                {dbpassengers.map((element,index) => {
                                                                    return <div className="dropdown-item" key={index+1} onClick={onCP} data-value={element.firstname+' '+element.lastname}>{element.firstname+' '+element.lastname}</div>
                                                                })}
                                                            </div>
                                                        </div> : <></>}
                                                    </div>
                                                    <div className='pass-bm'>
                                                        <div>
                                                            <div className="form-floating">
                                                                <input className={`cd-input-item-mr form-control ${invalid.firstname}`}
                                                                    type="text"
                                                                    onChange={onChangepd}
                                                                    value={personaldetails.firstname}
                                                                    name="firstname"
                                                                    id="firstname"
                                                                    placeholder="First name"
                                                                    onBlur={() => {
                                                                        let regex = /^[a-zA-Z]{1,}$/.test(personaldetails.firstname)
                                                                        setAlert({ ...alert, "firstname": regex })
                                                                        setInvalid({ ...invalid, 'firstname': regex ? '' : 'is-invalid' })
                                                                    }
                                                                    }
                                                                />
                                                                <label className='cd-innput-label' htmlFor="firstname">First name</label>
                                                            </div>
                                                            {alert.firstname === false ? <Alert error={"Please enter a first name"} /> : <></>}
                                                        </div>
                                                        <div>
                                                            <div className="form-floating">
                                                                <input className={`cd-input-item form-control ${invalid.lastname}`}
                                                                    type="text"
                                                                    onChange={onChangepd}
                                                                    value={personaldetails.lastname}
                                                                    name="lastname"
                                                                    id="lastname"
                                                                    placeholder="Last name"
                                                                    onBlur={() => {
                                                                        let regex = /^[a-zA-Z]{1,}$/.test(personaldetails.lastname)
                                                                        setAlert({ ...alert, "lastname": regex })
                                                                        setInvalid({ ...invalid, 'lastname': regex ? '' : 'is-invalid' })
                                                                    }
                                                                    }
                                                                />
                                                                <label className='cd-innput-label' htmlFor="lastname">Last name</label>
                                                            </div>
                                                            {alert.lastname === false ? <Alert error={"Please enter a last name"} /> : <></>}
                                                        </div>
                                                    </div>
                                                    <div className='pass-bm'>
                                                        <div>
                                                            <div className="form-floating">
                                                                <input className={`cd-input-item-mr form-control ${invalid.dateofbirth}`}
                                                                    type="date"
                                                                    onChange={onChangepd}
                                                                    value={personaldetails.dateofbirth}
                                                                    name="dateofbirth"
                                                                    id="dateofbirth"
                                                                    placeholder="Date of birth"
                                                                    onBlur={() => {
                                                                        let regex = /\d{1,}/g.test(personaldetails.dateofbirth)
                                                                        setAlert({ ...alert, "dateofbirth": regex })
                                                                        setInvalid({ ...invalid, 'dateofbirth': regex ? '' : 'is-invalid' })
                                                                    }
                                                                    }
                                                                />
                                                                <label className='cd-innput-label' htmlFor="dateofbirth">Date of birth</label>
                                                            </div>
                                                            {alert.dateofbirth === false ? <Alert error={"Please enter a date of birth"} /> : <></>}
                                                        </div>
                                                        <div>
                                                            <div className="form-floating">
                                                                <input className={`cd-input-item form-control ${invalid.nationality}`}
                                                                    type="text"
                                                                    onChange={onChangepd}
                                                                    value={personaldetails.nationality}
                                                                    name="nationality"
                                                                    id="nationality"
                                                                    placeholder="Nationality"
                                                                    onBlur={() => {
                                                                        let regex = /^[a-zA-Z]{1,}$/.test(personaldetails.nationality)
                                                                        setAlert({ ...alert, "nationality": regex })
                                                                        setInvalid({ ...invalid, 'nationality': regex ? '' : 'is-invalid' })
                                                                    }
                                                                    }
                                                                />
                                                                <label className='cd-innput-label' htmlFor="nationality">Nationality</label>
                                                            </div>
                                                            {alert.nationality === false ? <Alert error={"Please enter a Nationality"} /> : <></>}
                                                        </div>
                                                    </div>
                                                    <div >
                                                        <div className='select-radio-con'>
                                                            <div className={`form-check select-radio`}>
                                                                <input className={`form-check-input select-input  ${invalid.gender} `}
                                                                    onChange={(e) =>{
                                                                        handleRadio(e)
                                                                    }
                                                                    }
                                                                    checked={personaldetails.gender === 'Male'}
                                                                    value="Male" 
                                                                    type="radio"
                                                                    name="genderOptions"
                                                                    id="male"
                                                                    onBlur={()=>{
                                                                        let regex = /^[a-zA-Z]{1,}$/.test(personaldetails.gender)
                                                                        setAlert({ ...alert, "gender": regex })
                                                                        setInvalid({ ...invalid,'gender':regex?'':'is-invalid'})
                                                                    }}
                                                                />
                                                                <label className="form-check-label select-label" htmlFor="male">
                                                                    Male
                                                                </label>
                                                            </div>
                                                            <div className={`form-check select-radio `}>
                                                                <input className={`form-check-input select-input  ${invalid.gender}`}
                                                                    onChange={handleRadio} 
                                                                    type="radio"
                                                                    checked={personaldetails.gender === 'Female'}
                                                                    value="Female"
                                                                    name="genderOptions"
                                                                    id="female" 
                                                                    onBlur={()=>{
                                                                        let regex = /^[a-zA-Z]{1,}$/.test(personaldetails.gender)
                                                                        setAlert({ ...alert, "gender": regex })
                                                                        setInvalid({ ...invalid,'gender':regex?'':'is-invalid'})
                                                                    }}
                                                                />
                                                                <label className="form-check-label select-label" htmlFor="female">
                                                                    Female
                                                                </label>
                                                            </div>
                                                        </div>
                                                        {alert.gender === false ? <Alert error={"Please select a gender"} /> : <></>}
                                                    </div>
                                                    <div className='pass-bm'>
                                                        <div>
                                                            <div className="form-floating">
                                                                <input className={`cd-input-item-mr form-control ${invalid.passport}`}
                                                                    type="text"
                                                                    onChange={onChangepd}
                                                                    value={personaldetails.passport}
                                                                    name="passport"
                                                                    id="passport"
                                                                    placeholder="Passport (Optional)"
                                                                    onBlur={() => {
                                                                        // let regex =/^[a-zA-Z]{1,}$/.test(personaldetails.passport)
                                                                        // setAlert({...alert,"passport":regex})
                                                                        // setInvalid({...invalid,'passport':regex?'':'is-invalid'})
                                                                    }
                                                                    }
                                                                />
                                                                <label className='cd-innput-label' htmlFor="passport">Passport (Optional)</label>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="form-floating">
                                                                <input className={`cd-input-item form-control ${invalid.expirydate}`}
                                                                    type="date"
                                                                    onChange={onChangepd}
                                                                    value={personaldetails.expirydate}
                                                                    name="expirydate"
                                                                    id="expirydate"
                                                                    placeholder="Passport expirydate (Optional)"
                                                                    onBlur={() => {
                                                                        // let regex = /^[a-zA-Z]{1,}$/.test(personaldetails.expirydate)
                                                                        // setAlert({ ...alert, "expirydate": regex })
                                                                        // setInvalid({ ...invalid, 'expirydate': regex ? '' : 'is-invalid' })
                                                                    }
                                                                    }
                                                                />
                                                                <label className='cd-innput-label' htmlFor="expirydate">Passport expirydate (Optional)</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    </>
                        })}
                    </div>
                    <div className='cd-con'>
                        <div className='pd-form'>
                            <div className='pd-form-title'>Contact Details</div>
                            <div className='pd-form-tdesc'>Please provide your contact details so that we can notify you the updates on your flight</div>
                            <div>
                                <div className="dropdown">
                                    <button className="dbpass-btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" onClick={onSetPP}>
                                        <div>{primarypassenger}</div><div className='arrow down'></div>
                                    </button>
                                    <div className="dropdown-menu dbpass-dd-menu">
                                    <div className="dropdown-item" onClick={onSP} data-value='Select Primary Contact'>Selected Primary Contact</div>
                                        {localpassengers.map((element) => {
                                            return <div className="dropdown-item"  onClick={onSP} data-value={element.firstname?element.firstname+' '+element.lastname:'Passenger '+element.passengernumber}>{element.firstname?element.firstname+' '+element.lastname:'Passenger '+element.passengernumber}</div>
                                        })}
                                    </div>
                                </div>
                                {alert.primarycontact === false ? <Alert error={"Please select a primary contact"} /> : <></>}                               
                            </div>
                            <div className='d-flex'>
                                <div>
                                    <div className="form-floating">
                                        <input type="tel" maxLength={10} className={`cd-input-item-mr form-control ${invalid.mobilenumber}`} onChange={onChangecd} value={contactdetails.mobilenumber} name="mobilenumber" id="mobilenumber" placeholder="Mobile number"
                                            onBlur={() => {
                                                let regex = /^[0-9]{10,}$/.test(contactdetails.mobilenumber)
                                                setAlert({ ...alert, "mobilenumber": regex })
                                                setInvalid({ ...invalid, 'mobilenumber': regex ? '' : 'is-invalid' })
                                            }
                                            }
                                        />
                                        <label htmlFor="mobilenumber">Mobile number</label>
                                    </div>
                                    {alert.mobilenumber === false ? <Alert error={"Please enter a valid Mobile number"} /> : <></>}
                                </div>
                                <div>
                                    <div className="form-floating">
                                        <input type="email"  className={`cd-input-item form-control ${invalid.email}`} onChange={onChangecd} value={contactdetails.email} name="email" id="email" placeholder="Email"
                                            onBlur={() => {
                                                let ed = /@/.test(contactdetails.email)
                                                setAlert({ ...alert, "email": ed })
                                                setInvalid({ ...invalid, 'email': ed ? '' : 'is-invalid' })
                                            }
                                            }
                                        />
                                        <label htmlFor="email">Email</label>
                                    </div>
                                    {alert.email === false ? <Alert error={"Please enter a valid email"} /> : <></>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='d-flex justify-content-around'>
                        <button className='prcd-btn' onClick={proceed}>Proceed</button>
                    </div>
                </div>
                <div>
                    <div className='trip-summary-con'>
                        <div className='pd-ts-title'>Your trip summary</div>
                        {tripFlights.slice(0, searchflights[2].tripValue === 'Return' ? tripFlights.length : 1).map((flight, i) => {
                            const { flightname, departuredate, departuretime, departurecode, destinationdate, destinationtime, destinationcode ,_id} = flight
                            return  <>
                                        <div className='pd-fd-con' key={_id}>
                                            <div className='pd-ts-body'>
                                                <div className='pd-ts-body-item'>{i === 0 ? 'Outbound flight' : 'Inbound flight'}</div>
                                                <div className='d-flex justify-content-between'>
                                                    <div className='pd-ts-item'>{departuredate}</div>
                                                    <div className='pd-ts-item'>{destinationdate}</div>
                                                </div>
                                                <div className='d-flex'>
                                                    <div>
                                                        <div className='pd-ts-item'>{departuretime}</div>
                                                        <div className='pd-ts-item'>{departurecode}</div>
                                                    </div>
                                                    <div className='d-flex align-items-center'>
                                                        <div className='flightline'></div>
                                                    </div>
                                                    <div>
                                                        <div className='pd-ts-item'>{destinationtime}</div>
                                                        <div className='pd-ts-item'>{destinationcode}</div>
                                                    </div>
                                                </div>
                                                <div className='pd-ts-body-item'>Opearted by {flightname}</div>
                                            </div>
                                        </div>
                                    </>
                        }
                        )
                        }
                        <div className='pd-ts-footer'>
                            <div>
                                <div className='pd-ts-item'>Total trip price:</div>
                                <div>
                                    {searchflights[5].adultCount ? <>{searchflights[5].adultCount} Adult</> : ''}{searchflights[5].childCount ? <>+{searchflights[5].childCount}Child</> : ''}{searchflights[5].infantCount ? <>+{searchflights[5].infantCount}Infant</> : ''}
                                </div>
                            </div>
                            <div className='pd-ts-item'>{searchflights[2].tripValue === 'Return' ? (searchflights[5].passengerCount - searchflights[5].infantCount) * (searchflights[5].passengerClass === 'Economy' ? tripFlights[0].economyprice + tripFlights[1].economyprice : tripFlights[0].premiumprice + tripFlights[1].premiumprice) : (searchflights[5].passengerCount - searchflights[5].infantCount) * (searchflights[5].passengerClass === 'Economy' ? tripFlights[0].economyprice : tripFlights[0].premiumprice)}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Passengerdetails


