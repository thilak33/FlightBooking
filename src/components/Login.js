import React, { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import "../styles/Login.css";
import Alert from './Alert';
import flightContent from "../context/FlightContext";

const Login = () => {
    let navigate = useNavigate();
    const content = useContext(flightContent)
    const { getUsersdata } = content

    const [credentials, setCredentials] = useState({ email: "", password: "" })
    const [alert, setAlert] = useState({})
    const [invalid, setInvalid] = useState({})

    const onChangelogin = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const validationCheck = () => {
        let emailv = /@/.test(credentials.email)
        let pwdv = /^[a-zA-Z0-9]{1,}$/.test(credentials.password)

        setAlert({ ...alert, "email": emailv, "password": pwdv })
        setInvalid({ ...invalid, 'email': emailv ? '' : 'is-invalid', 'password': pwdv ? '' : 'is-invalid' })

        if (emailv && pwdv) {
            return true
        }
        else {
            return false
        }
    }

    const handleSubmit = async (e) => {
        let validation = validationCheck()
        if (validation) {
            e.preventDefault();
            const response = await fetch("http://localhost:4000/api/v1/auth/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: credentials.email, password: credentials.password })
            });
            const logindeatils = await response.json()
            console.log(logindeatils);
            if (logindeatils.success) {
                localStorage.setItem('token', logindeatils.authtoken);
                navigate('/');
            }
            if (logindeatils.success === false) {
                setAlert({ ...alert, "servermsg": logindeatils.success })
            }
        }
    }

    return (
        <div className='lr-con'>
            <div className='lr-f-title'>Log in</div>
            <div className='l-con'>
                <form className='lr-form'>
                    <div className='lr-partition-con'>
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
                            <label className='lr-input-label' htmlFor="email">Enter your email address</label>
                        </div>
                        {alert.email === false ? <Alert error={"Enter a valid email address"} /> : <></>}
                    </div>
                    <div className='lr-partition-con'>
                        <div className="form-floating">
                            <input className={`lr-input form-control ${invalid.password}`}
                                placeholder='Enter your password'
                                onChange={onChangelogin}
                                value={credentials.password}
                                type="text"
                                name="password"
                                id="password"
                                onBlur={() => {
                                    let regex = /^[a-zA-Z0-9]{1,}$/.test(credentials.password)
                                    setAlert({ ...alert, "password": regex })
                                    setInvalid({ ...invalid, 'password': regex ? '' : 'is-invalid' })
                                }
                                }
                            />
                            <label className='lr-input-label' htmlFor="password">Enter your password</label>
                        </div>
                        {alert.password === false ? <Alert error={"Please enter a valid password"} /> : <></>}
                    </div>
                    <div className='justify-content-center d-flex'>
                        {alert.servermsg === false ? <Alert error={"Please try to login with correct credentials"} /> : <></>}
                    </div>
                    <div className='d-flex justify-content-around'>
                        <div className='lr-btn' onClick={handleSubmit} >Login</div>
                    </div>
                </form>
                <div className='lr-link-con'>
                    <Link to="/register" className='lr-link-btn'>Don’t have an account yet?</Link>
                    <Link to="/register" className='lr-link-btn'>Forgot your password</Link>
                </div>
            </div>
        </div>
    )
}

export default Login