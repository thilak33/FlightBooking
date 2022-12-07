import React from 'react'
import '../styles/Alert.css'

const Alert = (props) => {
    const {error} = props
  return (
    <div className='alert-con'>
       <div>{error}</div>
    </div>
  )
}

export default Alert