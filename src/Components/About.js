import React from "react";

function About() {
  return (
    <div>
      <div className="lg:w-3/4 w-full pb-5 lg:pb-0 border-2 mx-auto min-h-[25rem] m-10 rounded-bl-xl rounded-br-xl">
        <h1 className="w-full h-20 bg-blue-800 flex justify-center items-center lg:text-2xl text-xl text-white">Welcome to Health Tracker</h1>
        <p className="m-2 text-justify lg:text-lg text-base p-5">At Health Tracker, we are dedicated to empowering individuals on their journey towards better health and well-being. Our mission is to provide you with the tools, insights, and support you need to take control of your health and make informed decisions.Founded by a team of passionate health enthusiasts, Health Tracker was born out of the desire to bridge the gap between technology and personal well-being. We understand that in today's fast-paced world, it's easy to neglect our health amidst our busy schedules. That's why we've created a comprehensive health tracking platform that seamlessly integrates into your lifestyle.What sets us apart is our commitment to user-centric design and data privacy. We believe that your health data is personal, and you should have full control over it. Our state-of-the-art security measures ensure that your information remains confidential and secure at all times.</p>
        <a className="underline cursor-pointer text-blue-500 mt-10" target="_blank" href="https://mail.google.com/mail/?view=cm&amp;fs=1&amp;to=21331@iiitu.ac.in">
          Contact Us
        </a>
      </div>
      <div className="lg:w-3/4 w-full pb-5 lg:pb-0 border-2 mx-auto min-h-[20rem] m-10 rounded-bl-xl rounded-br-xl">
        <h1 className="w-full h-20 bg-slate-800 flex justify-center items-center lg:text-2xl text-xl text-white">Our Team</h1>
        <p className="m-2 text-center lg:text-lg text-base p-5">This Health Tracker website was created by team efforts with co-ordination. The Git hub profile link are given below: </p>
        <div className="flex flex-col justify-center items-center gap-2 font-serif">
          <a className="hover:text-green-500 text-slate-800 hover:cursor-pointer underline hover:no-underline" target="_blank" href="https://github.com/ShivShankarKushwaha">Shiv Shankar Kushwaha</a>
          <a className="hover:text-green-500 text-slate-800 hover:cursor-pointer underline hover:no-underline" target="_blank" href="https://github.com/mayanksrivastava1">Mayank Srivastava</a>
          <a className="hover:text-green-500 text-slate-800 hover:cursor-pointer underline hover:no-underline" target="_blank" href="https://github.com/kumarDeeepak1">Kumar Deepak</a>
        </div>
      </div>
    </div>
  );
}

export default About;
