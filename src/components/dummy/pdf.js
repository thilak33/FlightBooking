
<>
<div>TV-Flights</div>
<div>
    <div>Booking ref: {}</div>
</div>
<div>ELECTRONIC TICKET RECIEPT</div>
<div className='fd-con'>
    <div className="fd-title-con">
        <div>From</div>
        <div>To</div>
        <div>Flight</div>
        <div>Departure</div>
        <div>Arrival</div>
    </div>
    <div className="fd-header-con">
        <div>{}</div>
        <div>{}</div>
        <div>{}</div>
        <div>{}</div>
        <div>{}</div>
    </div>
    <div className="fd-body-con">
        <div>Class:{}</div>
        <div>Booking status: OK</div>
        <div>Operated by:{}</div>
        <div>Marketed by:TV-Flights</div>
    </div>
</div>
<div className='pd-con'>
    <div className="pd-header-con">
        <div className='ts-i-m table-h'>Passenger name</div>
        <div className='ts-i-m table-h'>Passport</div>
        <div className='ts-i-m table-h'>Date of birth</div>
        <div className='ts-i-m table-h'>Type</div>
    </div>
    {passengersinfo.map((element)=>{
        const {firstname,lastname,passport,type} = element
    return  <div className="pd-body-con">
                <div>{firstname.replace(firstname.charAt(0), firstname.charAt(0).toUpperCase())+' '+lastname.replace(lastname.charAt(0), lastname.charAt(0).toUpperCase())}</div>
                <div>{passport?passport:'-'}</div>
                <div>-</div>
                <div>{type}</div>
            </div>
    })}
</div>
<div className="fare-con">
    <div>Total Amount</div>
    <div>{}</div>
</div>

</>