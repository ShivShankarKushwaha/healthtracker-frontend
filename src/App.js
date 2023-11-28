import React, {  useEffect, useState} from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import About from "./Components/About";
import Footer from "./Components/Footer";
import Home1 from "./Components/Home1";
import Login from "./Components/Login";
import Header1 from "./Components/Header1";
import Profile from "./Components/Profile";
import OTPpage from "./Components/OTPpage";
import Dashboard from "./Components/Dashboard";
import SymptomsList from "./Components/SymptomsList";
import Features1 from "./Components/Features1";
import GetAppointment from "./Components/Appointment";
import ExerciseTracker from "./Components/Goals";
import ResetPass from "./Components/ResetPass";
import DoctorScheduled from "./Components/DoctorScheduled";
import Requested from "./Components/Requested";

function App() {
  const [logincheck, setlogin] = useState("Log In");
  const [doctor,setdoctor]=useState(false);
  function forlogin(data) {
    setlogin(data);
  }
  useEffect(()=>
  {
    console.log('checking user',document.cookie);
    fetch('/initializeuser',{method:'post',body:new URLSearchParams({user:document.cookie})}).then(responce=>
      {
        if(responce.status===200)
        {
          console.log('inside initializeuser app.js');
          fetch("/doctorcheck")
          .then(responce=>
            {
              if(responce.status===200)
              {
                setdoctor(true);
                setlogin("Log Out");
              }
              else
              {
                setdoctor(false);
              }
              return responce.json()
            })
          .then(result=>{console.log(' result of doctor check',result);})
          .catch(err=>{console.log(err);})
        }
        else
        {
          setlogin('Log In');
        }
        return responce.json()
      })
    .then(result=>{console.log(result);})
    .catch(err=>{console.log(err);})
  },[])
  return (
    <div className="App">
      <BrowserRouter>
        <Header1 fun={forlogin} data={logincheck} doctor={doctor}></Header1>
        <Routes>
          <Route path="/" element={<Home1></Home1>}></Route>
          <Route path="/login" element={(logincheck !== "Log In") ? <SymptomsList></SymptomsList> : <Login fun={forlogin}></Login>}></Route>
          <Route path="/otp" element={<OTPpage fun={forlogin}></OTPpage>}></Route>
          <Route path="/dashboard" element={(logincheck !== "Log In") ?<Dashboard></Dashboard>: <Login fun={forlogin}></Login>}></Route>
          <Route path="/list" element={(logincheck !== "Log In") ? <SymptomsList></SymptomsList> : <Login fun={forlogin}></Login>}></Route>
          <Route path="/features" element={<Features1></Features1>}></Route>
          <Route path="/about" element={<About></About>}></Route>
          <Route path="/profile" element={(logincheck !== "Log In") ? <Profile fun={forlogin} data={logincheck}></Profile> : <Login fun={forlogin}></Login>}></Route>
          <Route path="/resetpass" element={(logincheck !== "Log In") ? <ResetPass fun={forlogin} data={logincheck}></ResetPass> : <Login fun={forlogin}></Login>}></Route>
          <Route path="/appointments" element={(logincheck !== "Log In") ? <GetAppointment></GetAppointment> : <Login fun={forlogin}></Login>}></Route>
          <Route path="/goals" element={(logincheck !== "Log In") ? <ExerciseTracker></ExerciseTracker>: <Login fun={forlogin}></Login>}></Route>
          {doctor && <Route path="/scheduled" element={ <DoctorScheduled></DoctorScheduled>}></Route>}
          {doctor && <Route path="/requested" element={ <Requested></Requested>}></Route>}
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
