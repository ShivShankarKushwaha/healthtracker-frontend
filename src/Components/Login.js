import React, { useEffect, useState } from 'react'
import { GoogleLoginButton } from "react-social-login-buttons";
import { useNavigate } from 'react-router-dom';

function Login(props)
{
  const navigate = useNavigate();
  let [signdata, setsign] = useState({ name: '', email: '', password: '', cnfpass: '' });
  let [logindata, setlogin] = useState({ email: '', password: '' });
  let [signerror, setserror] = useState("");
  let [loginerr, setloginerr] = useState("");
  let [logintext, setlogintext] = useState("Submit");
  let [signText, setsignText] = useState("Submit");
  useEffect(() =>
  {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Enable smooth scrolling behavior
    });
  }, []);
  useEffect(() =>
  {
    async function getuser()
    {
      let data = await fetch( '/user', { credentials: 'include' });
      if (data.status === 200) {
        props.fun("Log Out");
      }
    }
    getuser();
  }, [])
  async function sign(e)
  {

    e.preventDefault();
    setsignText('Processing');
    console.log('sign data is ' + JSON.stringify(signdata));
    var regex = /^[a-zA-Z\s]*$/;
    if (!regex.test(signdata.name) || signdata.name.length < 5 || signdata.name.length > 50) {
      setserror("*Username only can be alphabetic charcters and 6 to 50 character long");
      setsignText('Submit');
      return;
    }
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!mailformat.test(signdata.email)) {
      setserror("*Enter a valid email address")
      setsignText("Submit");
      return;
    }
    let reg1 = /[a-z]/;
    let reg2 = /[A-Z]/;
    let reg3 = /[0-9]/;
    var specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    let pass = signdata.password;
    if (pass.length < 6 || !reg1.test(pass) || !reg2.test(pass) || !reg3.test(pass) || !specialCharRegex.test(pass)) {
      setserror('*password must contain at least 1 upper,1 lower, 1 number , 1 special character and length more than 5')
      setsignText("Submit");
      return;
    }
    if (signdata.password !== signdata.cnfpass) {
      setserror("*password , confirm password did not match");
      setsignText("Submit");
      return;
    }
    setserror("");
    setsignText("Processing...");
    fetch( `/sign`, {
      method: 'POST',
      credentials: 'include',
      body: new URLSearchParams(signdata)
    })
      .then(response =>
      {
        if (response.status === 200) {
          setsignText("Submit");
          navigate("/otp");
        }
        return response.json();
      })
      .then(result =>
      {
        setserror('User Already Exists! Please Login instead of Sign');
        console.log(result);
        setsignText("Submit");
      });


  }
  async function login(e)
  {
    setlogintext("Processing...");
    e.preventDefault();
    let data = await fetch( "/login", { method: "POST", credentials: "include", body: new URLSearchParams(logindata) });
    if (data.status === 200) {
      console.log('user logged in');
      props.fun("Log Out");
      setlogintext("Submit");
      navigate("/");
    }
    else if (data.status === 404) {
      console.log('user not found');
      setlogintext("Submit");
      setloginerr('User Not Found');
    }
    else {
      console.log('incorrect credentials');
      setlogintext("Submit");
      setloginerr("Incorrect Credentials!, If previously Logged in with google the try to log in with google");
    }
  }
  return (
    <div className='flex flex-col'>
      <div className='flex flex-col lg:flex-row justify-center  items-center lg:py-5  h-auto gap-y-5'>
        <div className='lg:w-1/2 py-5 w-full border-0 lg:border-r-2 lg:h-full shadow-lg shadow-slate-500 flex items-center flex-col'>
          <h1 className='text-3xl font-bold text-blue-700 m-5'>SignUp</h1>
          <form className='flex flex-col justify-center items-center w-full lg:w-3/4 gap-5' onSubmit={(e) => sign(e)}>
            <input className='border-2 border-slate-200 outline-none p-2 w-full' type="text" name="name" placeholder='Enter Name' value={signdata.name} onChange={(e) => { setsign({ ...signdata, name: e.target.value }) }} required />
            <input className='border-2 border-slate-200 outline-none p-2 w-full' type="email" name="email" placeholder='Enter Email' value={signdata.email} onChange={(e) => { setsign({ ...signdata, email: e.target.value }) }} required />
            <input className='border-2 border-slate-200 outline-none p-2 w-full' type="password" name="password" placeholder='Enter Password' value={signdata.password} onChange={(e) => { setsign({ ...signdata, password: e.target.value }) }} required autoComplete='new-password' />
            <input className='border-2 border-slate-200 outline-none p-2 w-full' type="password" name="cnfrm-password" placeholder='Confirm Password' value={signdata.cnfpass} onChange={(e) => { setsign({ ...signdata, cnfpass: e.target.value }) }} required />
            {signerror}
            <button type='submit' className="bg-gradient-to-tr from-slate-500 to-slate-900 hover:scale-105 transform transition duration-200 ease-in-out shadow-lg rounded-lg text-white font-bold py-3 px-6">{signText}</button>

            {/* <h1 className='text-2xl border-t-2 w-full mt-5'>Sign Up With</h1> */}
            <div>
            
              {/* <a href={"https://healthtracker-coral.vercel.app/auth/google"}> */}
              <a href={"https://healthtracker-jwpl.onrender.com/auth/google"}>
                <GoogleLoginButton text='Sign Up with Google' />
              </a>
            </div>
          </form>
        </div>
        <div className='lg:w-1/2 w-full h-auto border-0 lg:border-l-2 lg:h-full shadow-lg shadow-slate-500 flex items-center flex-col py-20'>
          <h1 className='text-teal-700 text-3xl font-bold m-5'>Login</h1>
          <form className='flex flex-col justify-center items-center w-full lg:w-3/4 gap-5' onSubmit={(e) => login(e)}>
            <input className='border-2 border-slate-200 outline-none p-2 w-full' type="email" name="email" placeholder='Enter Email' value={logindata.email} onChange={(e) => { setlogin({ ...logindata, email: e.target.value }) }} required />
            <input className='border-2 border-slate-200 outline-none p-2 w-full' type="password" name="password" placeholder='Enter Password' value={logindata.password} onChange={(e) => { setlogin({ ...logindata, password: e.target.value }) }} required />
            <button type='submit' className="bg-gradient-to-tr from-blue-500 to-blue-900 hover:scale-105 transform transition duration-200 ease-in-out shadow-lg rounded-lg text-white font-bold py-3 px-6">{logintext}</button>
            {loginerr}
            {/* <h1 className='text-2xl border-t-2 w-full mt-5'>Login With</h1> */}
            <div className='my-1'>
              {/* <a href={ "https://healthtracker-coral.vercel.app/auth/google"}> */}
              <a href={ "https://healthtracker-jwpl.onrender.com/auth/google"}>
              {/* <a href={ "http://localhost:5500/auth/google"}> */}
                <GoogleLoginButton />
              </a>
            </div>
          </form>
        </div>
      </div>
      <a className='text-xl font-serif my-10 underline' rel='noreferrer' target='_blank' href="https://mail.google.com/mail/u/0/?fs=1&to=shivshankarkushwaha0000@gmail.com&tf=cm">For Doctor Sign Up contact Officials</a>
    </div>

  )
}

export default Login;