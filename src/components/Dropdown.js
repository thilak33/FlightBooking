import React from 'react'
import '../styles/Components.css'

const Dropdown = ({ className, value, onChange, options, defaultOption , onClick }) => {
    // const remove = (data) => {
    //     const frs = data.slice(1)
    //     const lrs = frs.slice(0,frs.length-1)
    //     return lrs
    // }
    return (
        <div className={`dropdown dd-com`}>
            <div className={`dropdown-toggle ${className}`} role="button" data-bs-toggle="dropdown" aria-expanded="false" onClick={onClick}>
                <div>{value}</div>
                <div className='down-caret'>
                    <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="caret bi bi-chevron-down" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
                    </svg>
                </div>
                <div className='up-caret'>
                    <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="caret bi bi-chevron-up" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z" />
                    </svg>
                </div>
            </div>
            <div className={`dropdown-menu dd-menu-${className}`}>
                <div onClick={onChange} data-value="Select State" className="dd-m-item">{defaultOption}</div>
                {options.map((element) => {
                    return <div key={element} className="dd-m-item" onClick={onChange} data-value={className==='primary'?element.firstname?element.firstname+' '+element.lastname:'Passenger '+element.passengernumber:element}>
                        {className==='primary'?element.firstname?element.firstname+' '+element.lastname:'Passenger '+element.passengernumber:element}
                    </div>
                })}
            </div>
        </div>
    )
}

export default Dropdown