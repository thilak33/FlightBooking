import React from 'react'
import '../styles/Alert.css'

const Alert = ({error,primary}) => {
  return (
    <div className={`alert-con ${primary}`}>
       <div>{error}</div>
    </div>
  )
}

export default Alert