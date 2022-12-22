import React from 'react'
import '../styles/Components.css'
import Alert from './Alert'
import { useFlight } from '../context/Flight'


const Input = ({className,placeholder,onChange, value, type, name, id, validation, alertmsg}) => {

    const {alert, setAlert, invalid, setInvalid} = useFlight()


    return (
        <div className='input-com'>
            <div className="form-floating">
                <input 
                    className={`input-${className} form-control ${invalid[name]}`}
                    placeholder={placeholder}
                    onChange={onChange}
                    value={value}
                    type={type}
                    name={name}
                    id={id}
                    onBlur={() => {
                            if(name !== 'cpassword'){
                                var pattern = new RegExp(validation);
                                let regex = pattern.test(value)
                                setAlert({...alert,[name]:regex})
                                setInvalid({...invalid,[name]:regex ? '' : 'is-invalid'})
                            }
                        }
                    }
                />
                <label className={`input-label-primary`} htmlFor={id}>{placeholder}</label>
            </div>
            {alert[name] === false ? <Alert primary={className} error={alertmsg} /> : <></>}
        </div>
    )
}

export default Input