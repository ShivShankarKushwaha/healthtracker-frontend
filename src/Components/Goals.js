// src/components/ExerciseTracker.js
import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function ExerciseTracker()
{
    const [runningMinutes, setRunningMinutes] = useState(0);
    const [exercizeminutes, setexercizeminutes] = useState(0);
    const [waterIntake, setWaterIntake] = useState(0);
    const [showreset,setshowreset]=useState(false);
    const [updatetarget,setupdatetarget]=useState(true);
    const [showAlert, setShowAlert] = useState(false);
    const [alertcolor, setalertcolor] = useState("bg-green-500");
    const [alerttext, setalerttext] = useState('');
    const [target,settarget]=useState({exercize:30,running:30,water:4000});
    const [usertarget,setusertarget]=useState({exercize:0,running:0,water:0});
    function alertfunction(text, color)
    {
        setShowAlert(true);
        setalerttext(text);
        setalertcolor(color);
        setTimeout(() =>
        {
            setShowAlert(false);
        }, 1500);
    }
    async function handletargetupdate()
    {
        let data = await fetch('/settarget',{method:'POST',credentials:'include',body:new URLSearchParams(usertarget)});
        if(data.status!==200)
        {
            return alertfunction('Target not updated','red');
        }
        setupdatetarget(!updatetarget);
        setshowreset(!showreset);
        alertfunction('Target successfully updated','green');

    }
    async function gettarget()
    {
        let data = await fetch('/gettarget',{credentials:'include'});
        if(data.status!=200)
        {
           return alertfunction('Target not found','red');
        }
        data = await data.json();
        settarget(data);
        setusertarget(data);
    }
    async function updatetoday()
    {
        let data = await fetch("/updatetoday",{method:'POST',credentials:'include',body:new URLSearchParams({running:runningMinutes,exercize:exercizeminutes,water:waterIntake})});
        if(data.status!=200)
        {
            return alertfunction('Not updated','red');
        }
        alertfunction('Todays Goals updated','green')
    }
    async function gettoday()
    {
        let data = await fetch("/gettoday",{method:'POST',credentials:'include',body:{}});
        if(data.status==200)
        {
            data = await data.json();
            setWaterIntake(data.water);
            setRunningMinutes(data.running);
            setexercizeminutes(data.exercize);
        }
    }
    useEffect(()=>
    {
        gettarget();
        gettoday();
    },[updatetarget]);
    return (
        <div className="lg:min-h-screen py-5 flex flex-col items-center justify-center bg-gray-100">
            <h2 className="text-2xl font-semibold mb-4">Daily Activity Tracker</h2>
            <button className="p-2 text-xl bg-gradient-to-br m-5 from-green-600 to-green-700 rounded-md text-white active:scale-95 hover:from-green-500 hover:to-green-700  duration-300" onClick={()=>setshowreset(!showreset)}>Reset Target</button>
            {showreset?<div className="lg:w-3/4 flex-wrap   w-full m-10 border-0 flex justify-center items-center gap-3">
                <div className="border-2 w-32  sm:w-40 drop-shadow-lg shadow-lg shadow-gray-300 flex flex-col justify-center items-center">
                    <img className="w-20 h-24" src="./exercize.png" alt="" />
                    <input className="p-1 w-full border-slate-400 border-2 outline-gray-300" type="number" placeholder="Exercize minutes" value={usertarget.exercize} onChange={(e)=>{setusertarget({...usertarget,exercize:e.target.value})}} />
                </div>
                <div className="border-2 w-32 sm:w-40 drop-shadow-lg shadow-lg shadow-gray-300 flex flex-col justify-center items-center">
                    <img className="w-20 h-24" src="./running.png" alt="" />
                    <input className="p-1 w-full outline-gray-300 border-slate-400 border-2" type="number" placeholder="Running/ walking minutes" value={usertarget.running} onChange={(e)=>{setusertarget({...usertarget,running:e.target.value})}} />
                </div>
                <div className="border-2 w-32 sm:w-40 drop-shadow-lg shadow-lg shadow-gray-300 flex flex-col justify-center items-center">
                    <img className="w-40 h-24" src="./drinkwater.jpeg" alt="" />
                    <input className="p-1 w-full border-slate-400 border-2 outline-gray-300" type="number" placeholder="water drink (in ml)" value={usertarget.water} onChange={(e) => { setusertarget({ ...usertarget, water: e.target.value }) }} />
                </div>
                <div className="border-2 w-32 h-32 sm:w-40 drop-shadow-lg shadow-lg shadow-gray-300 flex flex-col justify-center items-center">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 active:scale-95 duration-300" onClick={()=>{handletargetupdate()}}>Update</button>
                </div>
            </div>:null}
            <div className="flex space-x-4">
                <div className="w-1/3">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="goal">
                        Today Exercise (minutes):
                    </label>
                    <input type="number" id="goal" name="goal" className="w-full px-3 py-2 border rounded-lg" value={exercizeminutes} onChange={(e)=>{setexercizeminutes(e.target.value)}} />
                    <div className="m-4">
                        <CircularProgressbar
                            value={(exercizeminutes / target.exercize) * 100}
                            text={`${exercizeminutes} min`}
                            strokeWidth={8}
                            styles={buildStyles({
                                pathColor: "gold",
                                textColor: "black",
                            })}
                        />
                    </div>
                </div>
                <div className="w-1/3">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="running">
                        Today Running (minutes):
                    </label>
                    <input type="number" id="running" name="running" className="w-full px-3 py-2 border rounded-lg" value={runningMinutes} onChange={(e)=>setRunningMinutes(e.target.value)} />
                    <div className="m-4">
                        <CircularProgressbar
                            value={(runningMinutes / target.running) * 100}
                            text={`${runningMinutes} min `}
                            strokeWidth={8}
                            styles={buildStyles({
                                pathColor: "green",
                                textColor: "black",
                            })}
                        />
                    </div>
                </div>
                <div className="w-1/3">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="water">
                        Today Water Intake (ml):
                    </label>
                    <input type="number" id="water" name="water" className="w-full px-3 py-2 mt-4 lg:mt-0 border rounded-lg" value={waterIntake} onChange={(e) => { setWaterIntake(e.target.value); }} />
                    <div className="m-4">
                        <CircularProgressbar
                            value={(waterIntake / target.water) * 100}
                            text={`${waterIntake} ml`}
                            strokeWidth={8}
                            styles={buildStyles({
                                pathColor: "blue",
                                textColor: "black",
                            })}
                        />
                    </div>
                </div>
            </div>
            <button className="bg-blue-500 m-5 text-white px-4 py-2 rounded-lg hover:bg-blue-600 active:scale-95 duration-300" onClick={()=>{updatetoday()}}>Update Progress</button>
            {showAlert && (
                <div className={"fixed bottom-0 left-0 right-0  text-white p-4 flex justify-between bg-" + alertcolor+"-500"}>
                    <div>{alerttext}</div>
                    <button
                        className="ml-4 bg-white text-green-500 px-2 py-1 rounded hover:bg-green-100"
                        onClick={() => { setShowAlert(false); }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
            )}
        </div>
    );
}

export default ExerciseTracker;
