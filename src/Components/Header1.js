import * as React from 'react';
import { useMediaQuery } from 'react-responsive';
import Button from '@mui/material/Button';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
export default function Header1(props)
{
  const isSmallScreen = useMediaQuery({ maxWidth: '1024px' });
  console.log('checking small screen',isSmallScreen);
  const [user,setuser]= React.useState('');
  const [optionlist,setoptionlist]=React.useState(false);
  const navigate = useNavigate();
  function loginhandle()
  {
    if (props.data != "Log In") {
      fetch('/logout', { credentials: 'include' })
        .then(responce => responce.json())
        .then(result =>
        {
          setuser('');
          props.fun("Log In");
          console.log('successfully Logged Out');
        })
        .finally(()=>
        {
          props.fun("Log In");
        })
    }
    navigate('/login')
  }
  function openmenu(e)
  {
    let menu = document.getElementById('menu');
    let main = document.getElementById('main');
    let container = document.getElementById('container');
    if (menu.style.display == 'block') {
      menu.style.display = 'none';
      container.style.height = '5rem';
    }
    else {
      menu.style.display = 'block';
      container.style.height = '10rem'
    }
    // menu.style.display='block';
    main.style.flexDirection = 'column';
  }
  React.useEffect(()=>
  {
    async function getdata()
    {
      let data =await fetch('/user',{credentials:'include'});
      if(data.status===200)
      {
        props.fun("Log Out");
        data = await data.json();
        // console.log(data);
        console.log(data.img);
        for(let i=0;i<5;i++)
        {
          setTimeout(() => {
            setuser(data.img);
            console.log('user image save');
          }, 100);
        }
      }
      else
      console.log('no data found');
    }
    getdata();
  },[props.data]);
  React.useEffect(() =>
  {
    console.log('checking user', document.cookie);
    fetch('/initializeuser', { method: 'post', body: new URLSearchParams({ user: document.cookie }) }).then(responce =>
    {
      if (responce.status === 200) {
        setuser('https://www.logolynx.com/images/logolynx/s_4b/4beebce89d681837ba2f4105ce43afac.png')
      }
      return responce.json()
    })
      .then(result => { console.log(result); })
      .catch(err => { console.log(err); })
  }, [])
  return (
    <div className='h-20 p-2 block  md:p-0 w-full duration-300' id='container'>

      <div className=" md:py-2  lg:px-8  lg:w-full  border-0 flex justify-between" id='main'>
        <nav className="flex items-center justify-around w-full lg:w-auto" aria-label="Global">
          <Link to="/" className="flex items-center lg:flex-1 flex-shrink-0 space-x-2">
            <img className="w-auto h-12 md:h-14" src="https://storage.googleapis.com/mixo-files/logos/healthTrack-1692291065523.svg" alt="HealthTrack logo" />
            <p className="font-sans font-bold text-gray-900 text-2xl">HealthTracker</p>
          </Link>
          <div className="flex items-center space-x-2 lg:hidden" onClick={(e) => openmenu(e)}>
            <button type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-600">
              <span className="sr-only">Open main menu</span>
              <svg viewBox="0 0 20 20" width="1.2em" height="1.2em" className="h-6 w-6" aria-hidden="true"><path fill="currentColor" fillRule="evenodd" d="M2 4.75A.75.75 0 0 1 2.75 4h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75ZM2 10a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 10Zm0 5.25a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd"></path></svg>
            </button>
          </div>
        </nav>
        <div className='hidden lg:flex lg:items-center lg:justify-center' id='menu'>
          <div className="flex flex-wrap justify-center lg:h-auto  lg:border-0 lg:flex lg:gap-x-12" >
            <Button variant="text" color="primary" className='' onClick={() => { navigate('/') }}>Home</Button>
            {(props.data != "Log In" && !props.doctor) ? <Button onBlur={()=>{setTimeout(()=>{setoptionlist(false)},300)}} className='w-fit relative' variant="text" color="primary" onClick={() => { setoptionlist(!optionlist) }}>
              <span>Services</span>
              {optionlist?<div className='absolute flex flex-col top-14 w-40 -left-10 border-2 z-50 bg-slate-500 text-white '>
                <Link className='border-2 border-transparent hover:border-slate-200  p-1' to={"/dashboard"}>Dashboard</Link>
                <Link className='border-2 border-transparent hover:border-slate-200  p-1' to={"/list"}>List Symptoms</Link>
                <Link className='border-2 border-transparent hover:border-slate-200  p-1' to={"/appointments"}>Appointments</Link>
                <Link className='border-2 border-transparent hover:border-slate-200  p-1' to={"/goals"}>Exercise Goals</Link>
              </div>:null}
            </Button> :null}
            <Button className='w-fit' variant="text" color="primary" onClick={() => { navigate('/features') }}>Features</Button>
            {props.doctor &&<Button className='w-fit' variant="text" color="primary" onClick={() => { navigate('/scheduled') }}>Scheduled</Button>}
            {props.doctor &&<Button className='w-fit' variant="text" color="primary" onClick={() => { navigate('/requested') }}>Requested</Button>}
            <Button variant="text" color="primary" className='sm:w-fit w-fit lg:w-auto' onClick={() => { navigate('/about') }}>About Us</Button>
            {user ? <img className='w-10 h-10 place-self-center rounded-full cursor-pointer border-2 hover:border-0 active:border-4' onClick={() => { navigate('/profile') }} src={user} alt="User" /> :null}
            {/* <Button className=" bg-gradient-to-tr from-blue-500 to-blue-900 scale-75 hover:scale-90 transform transition duration-200 ease-in-out lg:shadow-md rounded-lg text-white font-thin lg:py-3 lg:px-4 lg:text-xl " style={props.data =="Log In"?{display:'block'}:{display:'block'}} onClick={() => { loginhandle(); }}>
              {props.data}
            </Button> */}
            {isSmallScreen && props.data == "Log In" && (
              <Button
                className="bg-gradient-to-tr from-blue-500 to-blue-900 scale-75 hover:scale-90 transform transition duration-200 ease-in-out lg:shadow-md rounded-lg text-white font-thin lg:py-3 lg:px-4 lg:text-xl"
                onClick={() => loginhandle()}
              >
                {props.data}
              </Button>
            )}
            {!isSmallScreen && (
              <Button
                className="bg-gradient-to-tr from-blue-500 to-blue-900 scale-75 hover:scale-90 transform transition duration-200 ease-in-out lg:shadow-md rounded-lg text-white font-thin lg:py-3 lg:px-4 lg:text-xl"
                onClick={() => loginhandle()}
              >
                {props.data}
              </Button>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}