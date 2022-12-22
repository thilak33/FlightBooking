import React, { useState, useContext } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import '../../styles/Auth.css';
import Alert from '../../components/Alert';
import Input from '../../components/Input';
import Button from '../../components/Button'
import { useAuth } from '../../context/Auth'
import { useFlight } from '../../context/Flight'

const Login = () => {
    const {auth, setAuth } = useAuth()

    const { alert, setAlert, invalid, setInvalid} = useFlight()

    const navigate = useNavigate();
    const location = useLocation();

    const [credentials, setCredentials] = useState({
        'lemail':'',
        'lpassword':''
    })
    // const [alert, setAlert] = useState({})
    // const [invalid, setInvalid] = useState({})

    const onChangelogin = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const validationCheck = () => {
        let emailv = /@/.test(credentials.lemail)
        let pwdv = /^[a-zA-Z0-9]{1,}$/.test(credentials.lpassword)

        setAlert({ ...alert, "lemail": emailv, "lpassword": pwdv })
        setInvalid({ ...invalid, 'lemail': emailv ? '' : 'is-invalid', 'lpassword': pwdv ? '' : 'is-invalid' })

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
                body: JSON.stringify({ email: credentials.lemail, password: credentials.lpassword })
            });
            const data = await response.json()
            if (data.success) {
                localStorage.setItem('auth',JSON.stringify(data));
                setAuth({...auth,user:data.user,token:data.token})
                navigate(location.state || '/');
            }
            if (data.success === false) {
                setAlert({ ...alert, "servermsg": data.success })
            }
        }
    }

    return (
        <div className='lr-con'>
            <div>
                <div className='lr-f-title'>Log in</div>
                <div className='lr-f-body'>
                    <form className='lr-form' onSubmit={handleSubmit}>
                        <div className='lr-form-item'>
                            <Input
                                className="primary"
                                placeholder='Enter your email address'
                                onChange={onChangelogin}
                                value={credentials.lemail}
                                type="text"
                                name="lemail"
                                id="lemail"
                                validation="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
                                alertmsg="Enter a valid email"
                            />
                        </div>
                        <div className='lr-form-item'>
                            <Input
                                className="primary"
                                placeholder='Enter your password'
                                onChange={onChangelogin}
                                value={credentials.lpassword}
                                type="password"
                                name="lpassword"
                                id="lpassword"
                                validation="^[a-zA-Z0-9@*_-]{1,}$"
                                alertmsg="Enter a valid password"
                            />
                        </div>
                        <div className='justify-content-center d-flex'>
                            {alert.servermsg === false ? <Alert error={"Please try to login with correct credentials"} /> : <></>}
                        </div>
                        <div className='lr-form-item'>
                        <div className='d-flex justify-content-around'>
                            <Button type="secondary">Login</Button>
                        </div>
                        </div>
                    </form>
                    <div className='lr-link-con'>
                        <Link to="/register" className='lr-link-btn'>Don’t have an account yet?</Link>
                        <Link to="/register" className='lr-link-btn'>Forgot your password</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login