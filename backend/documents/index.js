module.exports = ({ bookingid, passengersinfo, tripFlights }) => {
    const today = new Date();
return `
    <!doctype html>
    <html>
       <head>
          <meta charset="utf-8">
          <title>PDF Result Template</title>
            <style>
            body{
                margin: 0;
                padding: 0;
            }
            table, td {
                border: 0;
                border-collapse: collapse;
            }
            .pdf-title-con{
                margin:20px 20px;
            }
            .pdf-title-con .cpy-name{
                font: normal normal bold 20.01px/25.002px arial;
            }
            .title-i-m{
                font: normal normal normal 10px/12px arial;
            }
            .etr{
                color:white;
                font: normal normal normal 15.006px/16.998px arial;
                background-color: #5c0931;
                padding:10px 20px 5px;
            }
            .pdf-body-con{
                padding: 20px 15px 0;
                border:0;
            }
            .fd-con{
                border:0;
            }
            .fd-r-h-1{
                padding-left:5px;
                padding-bottom:5px;
                padding-top:10px;
            }
            .fd-r-h-2{
                padding-left:5px;
                padding-bottom:5px;
                padding-top:10px;
            }
            .fd-r-h-3{
                padding-left:5px;
                padding-bottom:5px;
                padding-top:10px;
            }
            .fd-r-h-4{
                padding-left:5px;
                padding-bottom:5px;
                padding-top:10px;
            }
            .fd-r-h-5{
                padding-left:5px;
                padding-bottom:5px;
                padding-top:10px;
            }
            .fd-r-1{
                padding-left:5px;
                padding-bottom:3px;
                padding-top:10px;
            }
            .fd-r-2{
                padding-left:5px;
                padding-bottom:3px;
                padding-top:10px;
            }
            .fd-r-3{
                padding-left:5px;
                padding-bottom:3px;
                padding-top:10px;
            }
            .fd-r-4{
                padding-left:5px;
                padding-bottom:3px;
                padding-top:10px;
            }
            .fd-r-5{
                padding-left:5px;
                padding-bottom:3px;
                padding-top:10px;
            }
            .fd-r-f-1{
                padding-left:5px;
                padding-bottom:3px;
                padding-top:3px;
            }
            .fd-r-f-2{
                padding-left:5px;
                padding-bottom:3px;
                padding-top:3px;
            }
            .fd-title-con{
                color: #fff;
                background-color: rgb(105, 102, 102);
                padding: 10px 5px 5px;
                font: normal normal normal 12.006px/12.998px arial;
            }
            .fd-header-con{
                background-color: #ccc;
                font: normal normal normal 13px/13px arial;
            }
            .fd-body-con{
                font: normal normal normal 12.006px/12.998px arial;
            }
            .fd-last-con{
                margin-top:3px;
                border-bottom: 1px solid rgb(105, 102, 102);
                font: normal normal normal 12.006px/12.998px arial;
            }
            .pd-con{
                width:100%
                padding: 20px 15px 0;
            }
            .pd-header-con{
                color: #fff;
                background-color: rgb(105, 102, 102);
                font: normal normal normal 13px/13px arial;
            }
            .pd-body-con{
                font: normal normal normal 12.006px/12.998px arial;
            }
            .pd-r-h-1{
                padding-left:5px;
                padding-bottom:5px;
                padding-top:10px;
            }
            .pd-r-h-2{
                padding-left:5px;
                padding-bottom:5px;
                padding-top:10px;
            }
            .pd-r-h-3{
                padding-left:5px;
                padding-bottom:5px;
                padding-top:10px;
            }
            .pd-r-h-4{
                padding-left:5px;
                padding-bottom:5px;
                padding-top:10px;
            }
            .pd-r-b-1{
                padding-left:5px;
                padding-bottom:5px;
                padding-top:5px;
            }
            .pd-r-b-2{
                padding-left:5px;
                padding-bottom:5px;
                padding-top:5px;
            }
            .pd-r-b-3{
                padding-left:5px;
                padding-bottom:5px;
                padding-top:5px;
            }
            .pd-r-b-4{
                padding-left:5px;
                padding-bottom:5px;
                padding-top:5px;
            }
            .pd-body-con{
                padding: 10px 0;
                border-bottom: 1px solid rgb(105, 102, 102);
            }
            .fd-b-i-s{
                font: normal normal normal 15.006px/17.998px arial;
            }
            .fp-head{
                color: #fff;
                background-color: rgb(105, 102, 102);
                font: normal normal normal 13px/13px arial;
            }
            .fp-body{
                font: normal normal normal 12.006px/12.998px arial;
                border-bottom: 1px solid rgb(105, 102, 102);
            }
            .fp-h-1{
                padding-left:5px;
                padding-bottom:5px;
                padding-top:10px;
            }
            .fp-b-1{
                padding-left:5px;
                padding-bottom:5px;
                padding-top:10px;
                tect-align:right
            }
            .fp-b-2{
                padding-left:5px;
                padding-bottom:5px;
                padding-top:10px;
                text-align:right
            }
        </style>
       </head>
       <body>
       <div class='pdf-con'>
            <table class='pdf-title-con'>
                <tr>
                    <td style='width:55%' rowspan="2" class='cpy-name'>TV-Flights</td>
                    <td style='width:45%' class='title-i-m'>Booking ref: ${bookingid}</td>
                </tr>
                <tr>
                    <td  class='title-i-m'>Date: ${`${today.getDate()}. ${today.getMonth() + 1}. ${today.getFullYear()}.`}</td>
                </tr>
            </table>
            <div class="etr">ELECTRONIC TICKET RECIEPT</div>
            <div class='pdf-body-con'>
                <table class='fd-con' style='width:100%'>
                    <tr class="fd-title-con">
                        <td style='width:30%' class='fd-r-h-1'>From</td>
                        <td style='width:30%' class='fd-r-h-2'>To</td>
                        <td style='width:13.3%' class='fd-r-h-3'>Flight</td>
                        <td style='width:13.3%' class='fd-r-h-4'>Departure</td>
                        <td style='width:13.3%' class='fd-r-h-5'>Arrival</td>
                    </tr>
                    ${tripFlights.map((element)=>{
                        return  `<tr class="fd-header-con">
                                    <td class='fd-r-1'>${element.departure+' '+element.departureairport}</td>
                                    <td class='fd-r-2'>${element.destination+' '+element.destinationairport}</td>
                                    <td class='fd-r-3'>${element.flightnumber}</td>
                                    <td class='fd-r-4'>${element.departuretime}</td>
                                    <td class='fd-r-5'>${element.destinationtime}</td>
                                </tr>
                                <tr class="fd-body-con">
                                    <td class="fd-r-1">Class: ${element.tripclass}</td>
                                    <td class="fd-r-2">Booking status: OK</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr class="fd-last-con">
                                    <td class="fd-r-f-1">Operated by: ${element.flightname}</td>
                                    <td class="fd-r-f-2">Marketed by: TV-Flights</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr class="fd-header-con">
                                    <td class='fd-r-1'>${element.rdeparture+' '+element.rdepartureairport}</td>
                                    <td class='fd-r-2'>${element.rdestination+' '+element.rdestinationairport}</td>
                                    <td class='fd-r-3'>${element.rflightnumber}</td>
                                    <td class='fd-r-4'>${element.rdeparturetime}</td>
                                    <td class='fd-r-5'>${element.rdestinationtime}</td>
                                </tr>
                                <tr class="fd-body-con">
                                    <td class="fd-r-1">Class: ${element.tripclass}</td>
                                    <td class="fd-r-2">Booking status: OK</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr class="fd-last-con">
                                    <td class="fd-r-f-1">Operated by: ${element.rflightname}</td>
                                    <td class="fd-r-f-2">Marketed by: TV-Flights</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>`
                    })}
                </table>
                <table class='pd-con' style='width:100%'>
                    <tr class='pd-header-con'>
                        <td class='pd-r-h-1 table-h'>Passenger name</td>
                        <td class='pd-r-h-2 table-h'>Passport</td>
                        <td class='pd-r-h-3 table-h'>Date of birth</td>
                        <td class='pd-r-h-4 table-h'>Type</td>
                    </tr>
                    ${passengersinfo.map((element)=>{
                    return  `<tr class='pd-body-con'>
                                <td class='pd-r-b-1'>${element.firstname+' '+element.lastname}</td>
                                <td class='pd-r-b-2'>${element.passport?element.passport:'-'}</td>
                                <td class='pd-r-b-3'>${element.dateofbirth?element.dateofbirth:'-'}</td>
                                <td class='pd-r-b-4'>${element.type?element.type:'-'}</td>
                            </tr>`
                    })}
                </table>
                <table class='fare-con' style='width:100%'>
                    <tr class='fp-head'>
                        <td class='fp-h-1'>Fare Details</td>
                        <td class='fp-h-2'></td>
                    </tr>
                    ${tripFlights.map((element)=>{
                        return `<tr class='fp-body'>
                                    <td class='fp-b-1'>Total price</td>
                                    <td class='fp-b-2'>${element.totalprice}</td>
                                <tr>`
                    })}
                </table>
            </div>
        </div>
       </body>
    </html>
    `;
};