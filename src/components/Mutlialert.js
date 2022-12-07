import React from 'react'

const Mutlialert = (props) => {
    const {multialert} = props
    console.log(multialert)
  return (
    <div className='alert-con'>
       <div>{multialert.departure}</div>
       <div>{multialert.arrival}</div>
       <div>{multialert.date}</div>
    </div>
  )
}

export default Mutlialert