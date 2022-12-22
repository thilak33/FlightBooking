import React,{ useEffect } from 'react'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'



const Loader = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [count,setCount] = useState(3)
    useEffect(()=>{
        const intervel = setInterval(() => {
            setCount((currentCount) => --currentCount);
        }, 1000);
        count ===0 && navigate('/login',{
            state: location.pathname,
        })
        return () => clearInterval(intervel)

    },[count])
  return (
    <div>Loader...</div>
  )
}

export default Loader