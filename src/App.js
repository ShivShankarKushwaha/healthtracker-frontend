import React, {  useState} from "react";
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

function App() {
  const [logincheck, setlogin] = useState("Log In");
  function forlogin(data) {
    setlogin(data);
  }
  return (
    <div className="App">
      <BrowserRouter>
        <Header1 fun={forlogin} data={logincheck}></Header1>
        <Routes>
          <Route path="/" element={<Home1></Home1>}></Route>
          <Route path="/login" element={logincheck !== "Log In" ? <SymptomsList></SymptomsList> : <Login fun={forlogin}></Login>}></Route>
          <Route path="/otp" element={<OTPpage fun={forlogin}></OTPpage>}></Route>
          <Route path="/dashboard" element={logincheck !== "Log In" ?<Dashboard></Dashboard>: <Login fun={forlogin}></Login>}></Route>
          <Route path="/list" element={logincheck !== "Log In" ? <SymptomsList></SymptomsList> : <Login fun={forlogin}></Login>}></Route>
          <Route path="/features" element={<Features1></Features1>}></Route>
          <Route path="/about" element={<About></About>}></Route>
          <Route path="/profile" element={logincheck !== "Log In" ? <Profile fun={forlogin} data={logincheck}></Profile> : <Login fun={forlogin}></Login>}></Route>
          <Route path="/appointments" element={logincheck !== "Log In" ? <GetAppointment></GetAppointment> : <Login fun={forlogin}></Login>}></Route>
          {/* <Route path="/appointments" element={ <GetAppointment></GetAppointment>}></Route> */}
          <Route path="/goals" element={logincheck !== "Log In" ? <ExerciseTracker></ExerciseTracker>: <Login fun={forlogin}></Login>}></Route>
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
