import React,{useContext,useEffect} from 'react'
import '../styles/Confirmationpage.css'
import flightContent from "../context/FlightContext";
import { Link } from 'react-router-dom';
// import { saveAs } from 'file-saver';
const Confirmationpage = () => {
  const content = useContext(flightContent)
  const {createPdf, getPdf } = content 
  const host = "http://localhost:4000"

  const download = async() => {
        const response = await fetch(`${host}/api/v1/myflight?_id=${localStorage.getItem('BookingID')}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            }
        });
        const pbdata = await response.json()
        if(pbdata.success){
            const response = await fetch(`${host}/api/v1/getpassofbook?_id=${localStorage.getItem('BookingID')}`,{
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                }
            })
            const bpdata = await response.json()
            if(bpdata.success){
                createPdf(localStorage.getItem('BookingID'),bpdata.passenger, pbdata.flights)
                .then(()=> getPdf())
            }
    }
  }
  // .then((res) => {
  //     const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
  //     console.log(pdfBlob)
  //     saveAs(pdfBlob, 'newPdf.pdf');
  //   })
//   return response.blob().then(function(myBlob) {
//     var objectURL = URL.createObjectURL(myBlob);
//     myImage.src = objectURL;
// });
  // fetch(myRequest)
  // .then((response) => response.blob())
  // .then((myBlob) => {
  //   const objectURL = URL.createObjectURL(myBlob);
  //   myImage.src = objectURL;
  // });

  // const download = () => {
  //   axios.post('/create-pdf', this.state)
  //     .then(() => axios.get('fetch-pdf', { responseType: 'blob' }))
  //     .then((res) => {
  //       const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

  //       saveAs(pdfBlob, 'newPdf.pdf');
  //     })
  // }
//   const myImage = document.querySelector('img');

// const myRequest = new Request('flowers.jpg');

// fetch(myRequest)
//   .then((response) => {
//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     return response.blob();
//   })
//   .then((response) => {
//     myImage.src = URL.createObjectURL(response);
//   });

  useEffect(() => {
    // setPassengersinfo(JSON.parse(localStorage.getItem('passengersinfo')))
}, [])
  return (
    <div className='d-flex justify-content-around'>
    {!localStorage.getItem('bookingstatus')?
          <div className='cp-con'>
            <div className='cp-alert-con cp-alert-sucesss-con'>
                <div className='cp-status-con'>Your Booking was successfull</div>
                <div className='cp-dad-con'>
                  <div className='bid-con'>
                    <div className='bid-l'>BOOKING ID: </div>
                    <div className='bid-r'>{localStorage.getItem('BookingID')}</div>
                  </div>
                  <div className='btn-con'>
                      <button className='cp-btn' onClick={download}>Download Booking</button>
                      {localStorage.getItem('token')?<Link to='/dashboard' className='cp-btn' >My Bookings</Link>:<></>}
                  </div>
                </div>
            </div>
          </div>
          :
          <div className='cp-con'>
            <div className='cp-alert-con cp-alert-sucesss-con'>
                <div className='cp-status-con'>Your Booking was unsuccessfull</div>
                <div className='cp-dad-con'>
                  <div className='bid-con'>
                    <div className='bid-l'>BOOKING ID: </div>
                    <div className='bid-r'>{localStorage.getItem('BookingID')}</div>
                  </div>
                  <div className='btn-con'>
                      <button className='cp-btn' onClick={download}>Download Booking</button>
                      {localStorage.getItem('token')?<Link to='/dashboard' className='cp-btn' >My Bookings</Link>:<></>}
                  </div>
                </div>
            </div>
          </div>
        }
      </div>
  )
}

export default Confirmationpage