import React from 'react'

const FilterDropdown = ({ className, placeholder, value, options, defaultOption, onChange }) => {
    return (
        <>
            <div className={`dropdown fdd-com`}>
                <div className={`dropdown-toggle ffd-${className}`} role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <div className="fdd-placeholder">{placeholder}</div>
                    <div className="fdd-value">
                        <div className="ffd-displayvalue">{value}</div>
                    </div>
                </div>
                <div className={`dropdown-menu fdd-menu-${className}`}>
                    {options.map((element) => {
                        return <div key={element.id} className="dd-m-item" onClick={() => {onChange(element)}} data-value={element.city}>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-city">{element.city}</div>
                                <div className="d-code">{element.id}</div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-country">
                                    {element.country}
                                </div>
                                <div className="d-name">{element.name}</div>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </>
    )
}

export default FilterDropdown