import React from 'react'
import '../styles/Components.css'

const Button = ({children, type, onChange}) => {
  return (
    <button className={`btn-com btn-com-${type}`} onClick={onChange} >{children}</button>
  )
}

export default Button