import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";


export default function Dashboard() {
  const [value, onChange] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [runningMinutes, setRunningMinutes] = useState(0);
  const [exercizeminutes, setexercizeminutes] = useState(0);
  const [target, settarget] = useState({ exercize: 30, running: 30, water: 4000 });
  const [waterIntake, setWaterIntake] = useState(0);
  useEffect(()=>
  {
    gettoday();
    gettarget();
  },[])

  async function gettoday(date)
  {
    var data;
    if(!date)
    {
      data = await fetch( "/gettoday", { method: 'POST', credentials: 'include', body: {} });
    }
    else
      data = await fetch( "/gettoday", { method: 'POST', credentials: 'include', body:new URLSearchParams({date:date}) });

    if (data.status == 200) {
      data = await data.json();
      console.log(data);
      setWaterIntake(data.water);
      setRunningMinutes(data.running);
      setexercizeminutes(data.exercize);
    }
  }
  async function gettarget()
  {
    let data = await fetch( '/gettarget', { credentials: 'include' });
    if (data.status != 200) {
      // return alertfunction('Target not found', 'red');
    }
    data = await data.json();
    settarget(data);
  }
  const customTileContent = ({ date, view }) => {
    if (selectedDate && view === 'month') {
      const isSelected = date.getDate() === selectedDate.getDate() &&
        date.getMonth() === selectedDate.getMonth() &&
        date.getFullYear() === selectedDate.getFullYear();
      return (
        <div className={`custom-tile ${isSelected ? 'selected' : ''}`}>
          {date.getDate()}
        </div>
      );
    }
    return null;
  };

  const handleDateClick = (value, event) =>
  {
    console.log('Date clicked:', value); 
    let date =new Date(value);
    date.setDate(date.getDate()+1);
    date = date.toISOString();
    console.log('date in iso format',date);
    gettoday(date);
  };
  return (
    <div>
      <div className='w-full'>
        <h1 className='text-clip font-bold text-opacity-80 text-blue-950 text-xl lg:text-2xl'>Track Your daily activity</h1>
        <div className="calendar-container">
          <Calendar
            className="lg:w-1/2 mx-auto m-5 text-xl border-2  lg:p-5"
            defaultView='month'
            defaultValue={new Date()}
            defaultActiveStartDate={new Date()}
            onChange={onChange}
            value={value}
            tileContent={customTileContent}
            onClickDay={handleDateClick}
          />
        </div>
      </div>
      <div className="flex space-x-4 lg:w-3/4  mx-auto">
        <div className="lg:w-1/3 lg:p-10">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="goal">
            Today Exercize (minutes):
          </label>
          <div className="m-5">
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
        <div className="lg:w-1/3 lg:p-10">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="running">
            Today Running (minutes):
          </label>
          <div className="m-5 ">
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
        <div className="lg:w-1/3 lg:p-10">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="water">
            Today Water Intake (ml):
          </label>
          <div className="m-5 mt-10">
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
      <div className='border-2 w-full h-40 flex justify-center items-center'>
        <h1 className='font-bold lg:text-xl'>All The prescription and suggested exercize will show here</h1>
      </div>
    </div>
  );
}
