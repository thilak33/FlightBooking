import React, { useState } from 'react'
import { useNavigate, } from 'react-router-dom'
import "../../styles/Auth.css";
import Alert from '../../components/Alert';
import Input from '../../components/Input';
import Dropdown from '../../components/Dropdown'
import Button from '../../components/Button'
import { useAuth } from '../../context/Auth'
import { useFlight } from '../../context/Flight'

const Register = () => {
    let navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        "remail": "",
        "rpassword": "",
        "rcpassword": "",
        "rcountrycode": "+91",
        "rmobilenumber": "",
        "rfirstname": "",
        "rlastname": "",
        "rdateofbirth": "",
        "rgender": "",
        "rstate": "Select State"
    })

    const States = [
        "Andhra Pradesh",
        "Arunachal Pradesh",
        "Assam",
        "Bihar",
        "Chatthisgarh",
        "Goa",
        "Gujarat",
        "Haryana",
        "Himachal Pradesh",
        "Jharkhand",
        "Karnataka",
        "Kerala",
        "Madhya Pradesh",
        "Maharashtra",
        "Manipur",
        "Meghalaya",
        "Mizoram",
        "Nagaland",
        "Odisha",
        "Punjab",
        "Rajasthan",
        "Sikkim",
        "Tamil Nadu",
        "Telangana",
        "Tripura",
        "West Bengal",
        "Uttarakhand",
        "Uttar Pradesh"
    ]

    const {auth, setAuth } = useAuth()

    const { alert, setAlert, invalid, setInvalid} = useFlight()

    const onChangelogin = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const handleRadio = (e) => {
        setCredentials({ ...credentials, 'rgender': e.target.value })
    }
    const selectState = (e) => {
        setCredentials({ ...credentials, "state": e.target.getAttribute('data-value') })
    }

    const validationCheck = () => {
        let emailv = /@/.test(credentials.remail)
        let pwdv = /^[a-zA-Z0-9]{1,}$/.test(credentials.rpassword)
        let cpwdv = credentials.rpassword === credentials.rcpassword ? true : false
        let mbv = /^[0-9]{10,}$/.test(credentials.rmobilenumber)
        let fnamev = /^[a-zA-Z]{1,}$/.test(credentials.rfirstname)
        let lnamev = /^[a-zA-Z]{1,}$/.test(credentials.rlastname)
        let dobv = /\d{1,}/g.test(credentials.rdateofbirth)
        let genderv = /^[a-zA-Z]{1,}$/.test(credentials.rgender)
        let statev = credentials.rstate !== 'Select State' ? true : false


        setAlert({
            ...alert, "remail": emailv,
            "rpassword": pwdv,
            "rcpassword": cpwdv,
            "rmobilenumber": mbv,
            "rfirstname": fnamev,
            "rlastname": lnamev,
            "rdateofbirth": dobv,
            "gender": genderv,
            "state": statev
        })
        setInvalid({
            ...invalid, 'remail': emailv ? '' : 'is-invalid',
            'rpassword': pwdv ? '' : 'is-invalid',
            'rcpassword': cpwdv ? '' : 'is-invalid',
            'rmobilenumber': mbv ? '' : 'is-invalid',
            'rfirstname': fnamev ? '' : 'is-invalid',
            'rlastname': lnamev ? '' : 'is-invalid',
            'rdateofbirth': dobv ? '' : 'is-invalid',
            'rgender': genderv ? '' : 'is-invalid',
            'rstate': statev ? '' : 'is-invalid'
        })
        if (emailv && pwdv && cpwdv && mbv && fnamev && lnamev && dobv && genderv) {
            return true
        }
        else {
            return false
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        var validation = validationCheck()
        if (validation) {
            console.log(credentials)
            const response = await fetch("http://localhost:4000/api/v1/auth", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: credentials.remail,
                    password: credentials.rpassword,
                    countrycode: credentials.rcountrycode,
                    mobilenumber: credentials.rmobilenumber,
                    firstname: credentials.rfirstname,
                    lastname: credentials.rlastname,
                    dateofbirth: credentials.rdateofbirth,
                    gender: credentials.rgender,
                    state: credentials.rstate
                })
            })
            const data = await response.json()
            if (data.success) {
                localStorage.setItem('auth',JSON.stringify(data));
                setAuth({...auth,user:data.user,token:data.token})
                // const data = await fetch("http://localhost:4000/api/v1/auth/createpassenger", {
                //     method: 'POST',
                //     headers: {
                //         'Content-Type': 'application/json',
                //         'auth-token': localStorage.getItem('token')
                //     },
                //     body: JSON.stringify({
                //         firstname: credentials.rfirstname,
                //         lastname: credentials.rlastname,
                //         dateofbirth: credentials.rdateofbirth,
                //         gender: credentials.rgender,
                //         state: credentials.rstate
                //     })
                // })
                // const passenger = await data.json()
                // console.log(passenger)
                navigate('/');
            }
        }
    }
    return (
        <div className='lr-con'>
            <div>
                <div className='lr-f-title'>Register</div>
                <div className='lr-f-body'>
                    <form className='lr-form' onSubmit={handleSubmit}>
                        <div className='part-con'>
                            <div className='part-con-title'>Let's create your credentials</div>
                            <div>
                                <div className='lr-form-item'>
                                    <Input
                                        className="primary"
                                        placeholder='Enter your email address'
                                        onChange={onChangelogin}
                                        value={credentials.remail}
                                        type="text"
                                        name="remail"
                                        id="remail"
                                        validation="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
                                        alertmsg="Enter a valid email"
                                    />
                                </div>
                                <div className='lr-form-item d-flex'>
                                    <Input
                                        className="secondary-mr"
                                        placeholder='Enter your password'
                                        onChange={onChangelogin}
                                        value={credentials.rpassword}
                                        type="password"
                                        name="rpassword"
                                        id="rpassword"
                                        validation="^[a-zA-Z0-9@*_-]{1,}$"
                                        alertmsg="Enter a valid password"
                                    />
                                    <Input
                                        className="secondary"
                                        placeholder='Confirm your password'
                                        onChange={onChangelogin}
                                        value={credentials.rcpassword}
                                        type="password"
                                        name="rcpassword"
                                        id="rcpassword"
                                        validation="^[a-zA-Z0-9@*_-]{1,}$"
                                        alertmsg="password and confirm password does not match"
                                    />
                                </div>
                                <div className='d-flex'>
                                    {/* <div className="form-floating">
                                        <input className={`lr-mutli-input-mr form-control`}
                                            placeholder='countrycode'
                                            value={credentials.rcountrycode}
                                            type="text"
                                            name="countrycode"
                                            id="countrycode"
                                            disabled={true}
                                        />
                                        <label className='cd-innput-label' htmlFor="countrycode">Country code</label>
                                    </div> */}
                                    <Input
                                        className="secondary"
                                        placeholder='Mobile number'
                                        onChange={onChangelogin}
                                        value={credentials.rmobilenumber}
                                        type="text"
                                        name="rmobilenumber"
                                        id="rmobilenumber"
                                        validation="^[0-9]{10,}$"
                                        alertmsg="Mobile number should be 10 characters long"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='pd-con part-con'>
                            <div>Your personal details</div>
                            <div>
                                <div className=' cred-partition-con d-flex'>
                                    <div className='lr-form-item'>
                                        <Input
                                            className="secondary-mr"
                                            placeholder='First name'
                                            onChange={onChangelogin}
                                            value={credentials.rfirstname}
                                            type="text"
                                            name="rfirstname"
                                            id="rfirstname"
                                            validation="^[a-zA-Z]{1,}$"
                                            alertmsg="Enter a valid first name"
                                        />
                                    </div>
                                    <div className='lr-form-item'>
                                        <Input
                                            className="secondary"
                                            placeholder='Last name'
                                            onChange={onChangelogin}
                                            value={credentials.rlastname}
                                            type="text"
                                            name="rlastname"
                                            id="rlastname"
                                            validation="^[a-zA-Z]{1,}$"
                                            alertmsg="Enter a valid last name"
                                        />
                                    </div>
                                </div>
                                <div className='d-flex'>
                                    <Input
                                        className="secondary-mr"
                                        placeholder='Date of birth'
                                        onChange={onChangelogin}
                                        value={credentials.rdateofbirth}
                                        type="date"
                                        name="rdateofbirth"
                                        id="rdateofbirth"
                                        validation="\d{1,}"
                                        alertmsg="Enter a valid date of birth"
                                    />
                                    <div className='radio-con'>
                                        <div className='rc-title'>Gender (Optional)</div>
                                        <div className='select-radio-con'>
                                            <div className={`form-check select-radio`}>
                                                <input className={`form-check-input select-input  ${invalid.rgender} `}
                                                    onChange={(e) => {
                                                        handleRadio(e)
                                                    }
                                                    }
                                                    checked={credentials.rgender === 'Male'}
                                                    value="Male"
                                                    type="radio"
                                                    name="genderOptions"
                                                    id="male"
                                                    onBlur={() => {
                                                        let regex = /^[a-zA-Z]{1,}$/.test(credentials.rgender)
                                                        setAlert({ ...alert, "rgender": regex })
                                                        setInvalid({ ...invalid, 'rgender': regex ? '' : 'is-invalid' })
                                                    }}
                                                />
                                                <label className="form-check-label select-label" htmlFor="male">
                                                    Male
                                                </label>
                                            </div>
                                            <div className={`form-check select-radio `}>
                                                <input className={`form-check-input select-input  ${invalid.rgender}`}
                                                    onChange={handleRadio}
                                                    type="radio"
                                                    checked={credentials.rgender === 'Female'}
                                                    value="Female"
                                                    name="genderOptions"
                                                    id="female"
                                                    onBlur={() => {
                                                        let regex = /^[a-zA-Z]{1,}$/.test(credentials.rgender)
                                                        setAlert({ ...alert, "rgender": regex })
                                                        setInvalid({ ...invalid, 'rgender': regex ? '' : 'is-invalid' })
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
                                <Dropdown
                                    className='secondary'
                                    value={credentials.rstate}
                                    onChange={selectState}
                                    options={States}
                                    defaultOption='Select State'
                                />
                                {alert.state === false ? <Alert error={"Please select your state you live in"} /> : <></>}
                            </div>
                        </div>
                        <div className='btn-con'>
                            <Button type="secondary">Create an account</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register


