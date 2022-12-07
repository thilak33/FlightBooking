import {  Route, BrowserRouter, Routes } from 'react-router-dom';
import './App.css';
import BookingSummary from './components/BookingSummary';
import Confirmationpage from './components/Confirmationpage';
import Dashboard from './components/Dashboard';
import FetchBooking from './components/FetchBooking';
import Home from './components/Home';
import Login from './components/Login';
import Navbar from './components/Navbar';
import OnewaySearch from './components/OnewaySearch';
import Passengerdetails from './components/Passengerdetails';
import Register from './components/Register';
import ReturnSearch from './components/ReturnSearch';
import FlightState from './context/FlightState';



function App() {
  return (
    <>
    <FlightState>
      <BrowserRouter>
            <Navbar/>
            <Routes>
              <Route path="/" element={ <Home />} />
              <Route exact path="/login" element={<Login/>}/>
              <Route exact path="/register" element={<Register />}/>
              <Route exact path="/fetchbooking" element={<FetchBooking />}/>
              <Route exact path="/dashboard" element={<Dashboard />}/>
              <Route exact path="/owsearch" element={<OnewaySearch />}/>
              <Route exact path="/rsearch" element={<ReturnSearch />}/>
              <Route exact path="/passengerdetails" element={<Passengerdetails />}/>
              <Route exact path="/bookingsummary" element={<BookingSummary />}/>
              <Route exact path="/confirmation" element={<Confirmationpage />}/>
            </Routes>
      </BrowserRouter>
    </FlightState>
    </>
  );
}

export default App;
