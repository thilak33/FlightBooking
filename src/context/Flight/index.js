import React, { createContext, useContext, useState, useEffect } from 'react'
import * as moment from 'moment';
import axios from 'axios'
import { useAuth } from '../Auth'
import { saveAs } from 'file-saver';

const FlightContent = createContext()


const FlightProvider = (props) => {

  const { auth } = useAuth()
  axios.defaults.baseURL = "http://localhost:4000/api/v1"
  axios.defaults.headers.common['auth-token'] = auth?.token

  const Airports = [
    {
      "name": "Kempegowda International Airport",
      "city": "Bengaluru",
      "id": "BLR",
      "country": "India"
    },
    {
      "name": "Chennai International Airport",
      "city": "Chennai",
      "id": "CHE",
      "country": "India"
    },
    {
      "name": "Indira Gandhi International Airport",
      "city": "Delhi",
      "id": "DEL",
      "country": "India"
    },
    {
      "name": "Rajiv Gandhi International Airport",
      "city": "Hyderabad",
      "id": "HYD",
      "country": "India"
    },
    {
      "name": "Netaji Subhash Chandra Bose International Airport",
      "city": "Kolkata",
      "id": "CCU",
      "country": "India"
    },
    {
      "name": "Chattrapati Shivaji Maharaj International Airport",
      "city": "Mumbai",
      "id": "BOM",
      "country": "India"
    }

  ]
  // Home
  //  const [search,setSearch] = useState('')
  //  const [pdinitial,setPdInitial] = useState([{}])
  //  const[passarray,setPassarray] = useState([])


  const [searchflights, setSearchFlights] = useState([
    {
      'departure': '',
      'departurecode': '',
      'departuredisplay': 'Select Departure'
    },
    {
      'arrival': '',
      'arrivalcode': '',
      'arrivaldisplay': 'Select Destination'
    },
    {
      'tripValue': 'One-way'
    },
    {
      'owdate': null,
      'departuredate': null,
    },
    {
      'rtndate': {},
      'departuredate': null,
      'destinationdate': null
    },
    {
      'passengerCount': 1,
      'adultCount': 1,
      'childCount': 0,
      'infantCount': 0,
      'passengerClass': 'Economy'
    },
  ])

  const updateSearchFlights = (index, value) => {
    const utf = searchflights.map((c, i) => {
      if (i === index) {
        return value;
      } else {
        return c;
      }
    });
    setSearchFlights(utf);
  }

  let initialFlights = [{}, {}];
  const [tripFlights, setTripFlights] = useState(initialFlights)

  const [localpassengers, setLocalPassengers] = useState([])
  const [alert, setAlert] = useState({})
  const [invalid, setInvalid] = useState({})

  const createLocalPassengers = (data) => {
    var passdataarray = []
    if (data.adultCount) {
      for (let i = 0; i < data.adultCount; i++) {
        passdataarray.push({
          'passengernumber': i + 1,
          'firstname': '',
          'lastname': '',
          'dateofbirth': '',
          'nationality': '',
          'gender': '',
          'passport': '',
          'expirydate': '',
          'type': 'Adult',
          'mobilenumber': NaN,
          'email': ''
        })
      }
    }
    if (data.childCount) {
      for (let i = 0; i < data.childCount; i++) {
        passdataarray.push({
          'passengernumber': data.adultCount + i + 1,
          'firstname': '',
          'lastname': '',
          'dateofbirth': '',
          'nationality': '',
          'gender': '',
          'passport': '',
          'expirydate': '',
          'type': 'Child',
          'mobilenumber': NaN,
          'email': ''
        })
      }
    }
    if (data.infantCount) {
      for (let i = 0; i < data.infantCount; i++) {
        passdataarray.push({
          'passengernumber': data.adultCount + data.childCount + i + 1,
          'firstname': '',
          'lastname': '',
          'dateofbirth': '',
          'nationality': '',
          'gender': '',
          'passport': '',
          'expirydate': '',
          'type': 'Infant',
          'mobilenumber': NaN,
          'email': ''
        })
      }
    }
    localStorage.setItem('passengersdata', JSON.stringify(passdataarray))
    setLocalPassengers(passdataarray)
  }

  const createPdf = async(bookingid,passengersinfo,tripFlights ) => {
    const createpdf = await axios.post(`/createpdf`,{
                bookingid:bookingid,
                passengersinfo:passengersinfo,
                tripFlights:tripFlights
      })
      const pdf = createpdf.json
      return  pdf
}
const getPdf = async() => {
    const {data} = await axios.get(`/getpdf`)
      return data.blob().then((myBlob)=>{
        const pdfBlob = new Blob([myBlob], { type: 'application/pdf' });
        saveAs(pdfBlob, 'newPdf.pdf');
      })
}




  useEffect(() => {

    var data = JSON.parse(localStorage.getItem('searchedData'))
    if (data) {
      if (data[2].tripValue === 'One-way') {
        let startDate = moment(data[3].owdate)
        let rep = { ...data[3], owdate: startDate }
        setSearchFlights([...data.slice(0, 3), rep, ...data.slice(4, data.length + 1)])
      }
      if (data[2].tripValue === 'Return') {
        let startDate = moment(data[4].rtndate.startDate)
        let endDate = moment(data[4].rtndate.endDate)
        let rep = { ...data[4], rtndate: { startDate, endDate } }
        setSearchFlights([...data.slice(0, 4), rep, ...data.slice(5, data.length + 1)])
      }
    }
    var flightdata = JSON.parse(localStorage.getItem('tripFlights'))
    if (flightdata) {
      setTripFlights(flightdata)
    }

    var passengerData = JSON.parse(localStorage.getItem('passengersdata'))
    if (passengerData) {
      setLocalPassengers(passengerData)
    }

  }, [])





  return (
    <FlightContent.Provider value={{
      Airports, searchflights, updateSearchFlights, tripFlights, setTripFlights,
      alert, setAlert, invalid, setInvalid, localpassengers, setLocalPassengers, createLocalPassengers,
      createPdf, getPdf
    }}>
      {props.children}
    </FlightContent.Provider>
  )
}

const useFlight = () => useContext(FlightContent)

export { useFlight, FlightProvider }
