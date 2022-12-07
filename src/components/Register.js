import React, { useState } from 'react'
import { useNavigate, } from 'react-router-dom'
import "../styles/Register.css";
import Alert from './Alert';

const Register = () => {
    let navigate = useNavigate();
    const [credentials, setCredentials] = useState({ 
        "email": "", 
        "password": "",
        "cpassword": "",
        "countrycode": "+91",
        "mobilenumber": "",
        "firstname": "",
        "lastname": "",
        "dateofbirth": "",
        "gender": "",
        "state": "Select State"
     })

    const [alert, setAlert] = useState({})
    const [invalid, setInvalid] = useState({})

    const onChangelogin = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const handleRadio = (e) => {
        setCredentials({ ...credentials, 'gender': e.target.value })
    }
    const selectState = (e) => {
        setCredentials({ ...credentials, "state": e.target.getAttribute('data-value') })
    }

    const validationCheck = () => {
        let emailv = /@/.test(credentials.email)
        let pwdv = /^[a-zA-Z0-9]{1,}$/.test(credentials.password)
        let cpwdv = credentials.password === credentials.cpassword?true:false
        let mbv = /^[0-9]{10,}$/.test(credentials.mobilenumber)
        let fnamev = /^[a-zA-Z]{1,}$/.test(credentials.firstname)
        let lnamev = /^[a-zA-Z]{1,}$/.test(credentials.lastname)
        let dobv = /\d{1,}/g.test(credentials.dateofbirth)
        let genderv = /^[a-zA-Z]{1,}$/.test(credentials.gender)
        let statev = credentials.state !== 'Select State'?true:false


        setAlert({ ...alert,"email": emailv,
                            "password": pwdv,
                            "cpassword": cpwdv,
                            "mobilenumber": mbv,
                            "firstname": fnamev,
                            "lastname": lnamev,
                            "dateofbirth": dobv,
                            "gender": genderv,
                            "state":statev
                        })
        setInvalid({ ...invalid,'email': emailv ? '' : 'is-invalid',
                                'password': pwdv ? '' : 'is-invalid',
                                'cpassword': cpwdv ? '' : 'is-invalid',
                                'mobilenumber': mbv ? '' : 'is-invalid',
                                'firstname': fnamev ? '' : 'is-invalid',
                                'lastname': lnamev ? '' : 'is-invalid',
                                'dateofbirth': dobv ? '' : 'is-invalid',
                                'gender':genderv?'':'is-invalid',
                                'state':statev?'':'is-invalid'
                            })
        if(emailv && pwdv && cpwdv && mbv && fnamev && lnamev && dobv && genderv){
            return true
        }
        else{
            return false
        }
    } 

    const handleSubmit = async (e) => {
        var validation = validationCheck()
        if(validation){
            console.log(credentials)
            e.preventDefault();
            const response = await fetch("http://localhost:4000/api/v1/auth", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: credentials.email,
                    password: credentials.password,
                    countrycode: credentials.countrycode,
                    mobilenumber: credentials.mobilenumber,
                    firstname: credentials.firstname,
                    lastname: credentials.lastname,
                    dateofbirth: credentials.dateofbirth,
                    gender: credentials.gender,
                    state: credentials.state
                })
            })
            const json = await response.json()
            console.log(json)
            if (json.success) {
                localStorage.setItem('token', json.authtoken);
                const data = await fetch("http://localhost:4000/api/v1/auth/createpassenger", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': localStorage.getItem('token')
                    },
                    body: JSON.stringify({
                        firstname: credentials.firstname,
                        lastname: credentials.lastname,
                        dateofbirth: credentials.dateofbirth,
                        gender: credentials.gender,
                        state: credentials.state
                    })
                })
                const passenger = await data.json()
                console.log(passenger)
                navigate('/');
            }
        }
    }
    return (
        <div className='register-con'>
            <div className='lr-f-title'>Register</div>
            <form className='lr-form'>
                <div className='cred-con part-con'>
                    <div>Let's create your credentials</div>
                    <div>
                        <div className='cred-partition-con'>
                            <div className="form-floating">
                                <input className={`lr-input form-control ${invalid.email}`}
                                    placeholder='Enter your email address'
                                    onChange={onChangelogin}
                                    value={credentials.email}
                                    type="text"
                                    name="email"
                                    id="email"
                                    onBlur={() => {
                                        let regex = /@/.test(credentials.email)
                                        setAlert({ ...alert, "email": regex })
                                        setInvalid({ ...invalid, 'email': regex ? '' : 'is-invalid' })
                                    }
                                    }
                                />
                                <label className='cd-innput-label' htmlFor="email">Enter your email address</label>
                            </div>
                            {alert.email === false ? <Alert error={"Enter a valid email address"} /> : <></>}
                        </div>
                        <div className='cred-partition-con d-flex'>
                            <div>
                                <div className="form-floating">
                                    <input className={`lr-mutli-input-mr form-control ${invalid.password}`}
                                        placeholder='Enter your password'
                                        onChange={onChangelogin}
                                        value={credentials.password}
                                        type="text"
                                        name="password"
                                        id="password"
                                        onBlur={() => {
                                            let regex = /^[a-zA-Z0-9@*_-]{1,}$/.test(credentials.password)
                                            setAlert({ ...alert, "password": regex })
                                            setInvalid({ ...invalid, 'password': regex ? '' : 'is-invalid' })
                                        }
                                        }
                                    />
                                    <label className='cd-innput-label' htmlFor="password">Enter your password</label>
                                </div>
                                {alert.password === false ? <Alert error={"Please enter a valid password"} /> : <></>}
                            </div>
                            <div>
                                <div className="form-floating">
                                    <input className={`lr-mutli-input form-control ${invalid.cpassword}`}
                                        placeholder='Confirm your password'
                                        onChange={onChangelogin}
                                        value={credentials.cpassword}
                                        type="text"
                                        name="cpassword"
                                        id="cpassword"
                                        onBlur={() => {
                                            if(credentials.password === credentials.cpassword){
                                                setAlert({ ...alert, "cpassword": true })
                                                setInvalid({ ...invalid, 'cpassword': true ? '' : 'is-invalid' })
                                            }
                                            if(credentials.password !== credentials.cpassword){
                                                setAlert({ ...alert, "cpassword": false })
                                                setInvalid({ ...invalid, 'cpassword': false ? '' : 'is-invalid' })
                                            }
                                        }
                                        }
                                    />
                                    <label className='cd-innput-label' htmlFor="password">Confirm your password</label>
                                </div>
                                {alert.cpassword === false ? <Alert error={"Password does not match"} /> : <></>}
                            </div>
                        </div>
                        <div className='d-flex'>
                            <div className="form-floating">
                                <input className={`lr-mutli-input-mr form-control`}
                                    placeholder='countrycode'
                                    value={credentials.countrycode}
                                    type="text"
                                    name="countrycode"
                                    id="countrycode"
                                    disabled={true}
                                />
                                <label className='cd-innput-label' htmlFor="countrycode">Country code</label>
                            </div>
                            <div>
                                <div className="form-floating">
                                    <input className={`lr-mutli-input form-control ${invalid.mobilenumber}`} 
                                    type="tel" 
                                    maxLength={10} 
                                    onChange={onChangelogin} 
                                    value={credentials.mobilenumber} 
                                    name="mobilenumber" 
                                    id="mobilenumber" 
                                    placeholder="Mobile number"
                                        onBlur={() => {
                                            let regex = /^[0-9]{10,}$/.test(credentials.mobilenumber)
                                            setAlert({ ...alert, "mobilenumber": regex })
                                            setInvalid({ ...invalid, 'mobilenumber': regex ? '' : 'is-invalid' })
                                        }
                                        }
                                        disabled={localStorage.getItem('token')}
                                    />
                                    <label htmlFor="mobilenumber">Mobile number</label>
                                </div>
                            </div>
                        </div>
                        {alert.mobilenumber === false ? <Alert error={"Your mobile number should be 10 characters long"} /> : <></>}
                    </div>
                </div>
                <div className='pd-con part-con'>
                    <div>Your personal details</div>
                    <div>
                        <div className=' cred-partition-con d-flex'>
                            <div>
                                <div className="form-floating">
                                    <input className={`lr-mutli-input-mr form-control ${invalid.firstname}`}
                                        placeholder='First name'
                                        onChange={onChangelogin}
                                        value={credentials.firstname}
                                        type="text"
                                        name="firstname"
                                        id="firstname"
                                        onBlur={() => {
                                            let regex = /^[a-zA-Z]{1,}$/.test(credentials.firstname)
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
                                    <input className={`lr-mutli-input form-control ${invalid.lastname}`}
                                        placeholder='Last name' 
                                        onChange={onChangelogin} 
                                        value={credentials.lastname} 
                                        type="text" name="lastname" 
                                        id="lastname"
                                        onBlur={() => {
                                            let regex = /^[a-zA-Z]{1,}$/.test(credentials.lastname)
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
                        <div className='d-flex'>
                            <div>
                                <div className="form-floating">
                                    <input className={`lr-mutli-input-mr form-control ${invalid.dateofbirth}`}
                                       placeholder='Date of birth' 
                                       onChange={onChangelogin} 
                                       value={credentials.dateofbirth} 
                                       type="date" 
                                       name="dateofbirth" 
                                       id="dateofbirth"
                                        onBlur={() => {
                                            let regex = /\d{1,}/g.test(credentials.dateofbirth)
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
                                <div className='gender-title'>Gender (Optional)</div>
                                <div className='select-radio-con'>
                                    <div className={`form-check select-radio`}>
                                        <input className={`form-check-input select-input  ${invalid.gender} `}
                                            onChange={(e) =>{
                                                handleRadio(e)
                                            }
                                            }
                                            checked={credentials.gender === 'Male'}
                                            value="Male" 
                                            type="radio"
                                            name="genderOptions"
                                            id="male"
                                            onBlur={()=>{
                                                let regex = /^[a-zA-Z]{1,}$/.test(credentials.gender)
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
                                            checked={credentials.gender === 'Female'}
                                            value="Female"
                                            name="genderOptions"
                                            id="female" 
                                            onBlur={()=>{
                                                let regex = /^[a-zA-Z]{1,}$/.test(credentials.gender)
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
                        </div>
                    </div>
                </div>
                <div className='wliv-con part-con'>
                    <div>Where do you live ?</div>
                    <div>
                        <div className="dropdown">
                            <div className={`dropdown-toggle lr-dropdown lr-input-item live-dd `} role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {credentials.state}
                            </div>
                            <div className="dropdown-menu dd-menu">
                                <div onClick={selectState} data-value="Select State" className="dropdown-item state-item">Select State</div>
                                <div onClick={selectState} data-value="Andhra Pradesh" className="dropdown-item state-item">Andhra Pradesh</div>
                                <div onClick={selectState} data-value="Arunachal Pradesh" className="dropdown-item state-item">Arunachal Pradesh</div>
                                <div onClick={selectState} data-value="Assam" className="dropdown-item state-item">Assam</div>
                                <div onClick={selectState} data-value="Bihar" className="dropdown-item state-item">Bihar</div>
                                <div onClick={selectState} data-value="Chhattisgarh" className="dropdown-item state-item">Chhattisgarh</div>
                                <div onClick={selectState} data-value="Goa" className="dropdown-item state-item">Goa</div>
                                <div onClick={selectState} data-value="Gujarat" className="dropdown-item state-item">Gujarat</div>
                                <div onClick={selectState} data-value="Haryana" className="dropdown-item state-item">Haryana</div>
                                <div onClick={selectState} data-value="Himachal Pradesh" className="dropdown-item state-item">Himachal Pradesh</div>
                                <div onClick={selectState} data-value="Jharkhand" className="dropdown-item state-item">Jharkhand</div>
                                <div onClick={selectState} data-value="Karnataka" className="dropdown-item state-item">Karnataka</div>
                                <div onClick={selectState} data-value="Kerala" className="dropdown-item state-item">Kerala</div>
                                <div onClick={selectState} data-value="Madhya Pradesh" className="dropdown-item state-item">Madhya Pradesh</div>
                                <div onClick={selectState} data-value="Maharashtra" className="dropdown-item state-item">Maharashtra</div>
                                <div onClick={selectState} data-value="Manipur" className="dropdown-item state-item">Manipur</div>
                                <div onClick={selectState} data-value="Meghalaya" className="dropdown-item state-item">Meghalaya</div>
                                <div onClick={selectState} data-value="Mizoram" className="dropdown-item state-item">Mizoram</div>
                                <div onClick={selectState} data-value="Nagaland" className="dropdown-item state-item">Nagaland</div>
                                <div onClick={selectState} data-value="Odisha" className="dropdown-item state-item">Odisha</div>
                                <div onClick={selectState} data-value="Punjab" className="dropdown-item state-item">Punjab</div>
                                <div onClick={selectState} data-value="Rajasthan" className="dropdown-item state-item">Rajasthan</div>
                                <div onClick={selectState} data-value="Sikkim" className="dropdown-item state-item">Sikkim</div>
                                <div onClick={selectState} data-value="Tamil Nadu" className="dropdown-item state-item">Tamil Nadu</div>
                                <div onClick={selectState} data-value="Telangana" className="dropdown-item state-item">Telangana</div>
                                <div onClick={selectState} data-value="Tripura" className="dropdown-item state-item">Tripura</div>
                                <div onClick={selectState} data-value="Uttarakhand" className="dropdown-item state-item">Uttarakhand</div>
                                <div onClick={selectState} data-value="Uttar Pradesh" className="dropdown-item state-item">Uttar Pradesh</div>
                                <div onClick={selectState} data-value="West Bengal" className="dropdown-item state-item">West Bengal</div>
                            </div>
                        </div>
                        {alert.gender === false?<Alert error={"Please select your state you live in"}/>:<></>}
                    </div>
                </div>
                <div className='btn-con'>
                    <div className='lr-btn'onClick={handleSubmit} >Create an account</div>
                </div>
            </form>
        </div>
    )
}

export default Register



