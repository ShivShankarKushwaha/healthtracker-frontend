import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home1() {
  const navigate = useNavigate();
  // useEffect(()=>
  // {
  //   fetch('/initializeuser').then(responce=>responce.json()).then(result=>{console.log(result);}).catch(err=>{console.log(err);})
  // },[])
  return (
    <div>
      <section id="yylbsnh2" className="overflow-hidden lg:relative pt-0 sm:pt-20 md:pt-14 lg:pt-3" sectionname="hero" sectionlabel="Hero" sortorder="0">
        <div className="md:w-lg px-4 mx-auto sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl lg:grid lg:grid-cols-2 lg:gap-24 relative z-10">
          <div className="relative z-[1]">
            <div className="">
              <div className="mt-6 sm:max-w-xl">
                <h1 className="lg:text-4xl font-black tracking-tight text-gray-900 sm:text-xl xl:text-7xl lg:text-justify">Take control of your health with HealthTracker</h1>
                <h2 className="prose prose-user mt-6 text-lg text-gray-500 lg:text-xl text-justify">Stay on top of your health with our comprehensive health tracking platform. Store your symptoms, schedule appointments, and consult with doctors all in one place</h2>
              </div>

              <div className="mt-6">
                <div className="inline-flex items-center">
                  <img src="/user.jpg" alt="Shiv Shankar" className="hidden md:inline-block mr-3 border-2 rounded-full w-14  md:w-20" />
                  <div>
                    <p className="sm:pl-2.5 text-base font-black tracking-tight text-gray-800 sm:text-lg text-justify"> “HealthTracker has made managing my health so much easier. I can track my symptoms, schedule appointments, and even consult with doctors without leaving my home.” </p>
                    <p className="sm:pl-2.5 text-sm sm:text-base font-bold text-gray-500"> Shiv Shankar Kushwaha </p>
                  </div>
                </div>
              </div>
              <div className="ratings mt-6" data-testid="ratings">
                <div className="flex items-center gap-3 divide-x divide-gray-300 text-center sm:text-left">
                  <div className="flex flex-wrap flex-shrink-0">
                    <svg viewBox="0 0 20 20" width="1.2em" height="1.2em" className="w-5 h-5 text-yellow-400">
                      <path fill="currentColor" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 0 0-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 0 0 .951-.69l1.07-3.292Z"></path>
                    </svg>
                    <svg viewBox="0 0 20 20" width="1.2em" height="1.2em" className="w-5 h-5 text-yellow-400">
                      <path fill="currentColor" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 0 0-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 0 0 .951-.69l1.07-3.292Z"></path>
                    </svg>
                    <svg viewBox="0 0 20 20" width="1.2em" height="1.2em" className="w-5 h-5 text-yellow-400">
                      <path fill="currentColor" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 0 0-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 0 0 .951-.69l1.07-3.292Z"></path>
                    </svg>
                    <svg viewBox="0 0 20 20" width="1.2em" height="1.2em" className="w-5 h-5 text-yellow-400">
                      <path fill="currentColor" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 0 0-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 0 0 .951-.69l1.07-3.292Z"></path>
                    </svg>{" "}
                    <svg viewBox="0 0 20 20" width="1.2em" height="1.2em" className="w-5 h-5 text-yellow-400">
                      <path fill="currentColor" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 0 0-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 0 0 .951-.69l1.07-3.292Z"></path>
                    </svg>
                  </div>
                  <div className="min-w-0 py-1 text-sm text-gray-500 pl-3"> Easy symptom tracking</div>
                  <div className="min-w-0 py-1 text-sm text-gray-500 pl-3"> Convenient doctor consultations</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="sm:pl-6">
          <div className="pt-12 sm:relative sm:mt-12 sm:pt-16 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 z-20">
            <div className="hidden sm:block">
              {/* <div className="absolute inset-y-0 w-screen left-1/2 bg-gray-50 rounded-l-3xl lg:left-80 lg:right-0 lg:w-full"></div> */}
              <svg className="absolute -mr-3 top-8 right-1/2 lg:m-0 lg:left-0" width="404" height="392" fill="none" viewBox="0 0 404 392">
                <defs>
                  <pattern id="837c3e70-6c3a-44e6-8854-cc48c737b659" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    {" "}
                    <rect x="0" y="0" width="4" height="4" className="text-gray-200" fill="currentColor"></rect>{" "}
                  </pattern>
                </defs>
                <rect width="404" height="392" fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"></rect>
              </svg>
            </div>
            <div className="relative pl-4 ml-auto sm:max-w-3xl sm:px-0 lg:h-full lg:max-w-none lg:flex lg:items-center xl:pl-12">
              <img className="w-full rounded-l-3xl lg:w-auto 2xl:h-full 2xl:max-w-none 2xl:rounded-3xl" src="https://images.unsplash.com/photo-1510017803434-a899398421b3?crop=entropy&amp;cs=tinysrgb&amp;fit=max&amp;fm=jpg&amp;ixid=M3wzMzczODV8MHwxfHNlYXJjaHwxfHxoZWFsdGglMjB0cmFja2VyfGVufDB8MHx8fDE2OTIyOTEwNjR8MA&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=1080" alt="HealthTracker" />
            </div>
          </div>
        </div>
      </section>
      <div className="flex flex-col-reverse md:flex-row w-full md:my-52 my-5 md:mr-20 justify-start items-center">
        <img src="h1.jpeg" className="md:w-1/2 " alt="" />
        <div className="md:w-1/3 md:text-left text-justify p-5">
          <h1 className="md:text-4xl font-bold">Track and Manage your symptoms</h1>
          <p>HealthTracker allows you to easily track and manage your symptoms. Keep a record of your health history and identify patterns or triggers.</p>
        </div>
      </div>
      <div className="flex md:flex-row flex-col  w-full md:my-52 my-5  justify-end items-center">
        <div className="md:w-1/3 md:text-right text-justify p-5">
          <h1 className="md:text-4xl font-bold">Schedule and organize appointments</h1>
          <p>With HealthTracker, you can schedule and organize your appointments with ease. Never miss an important medical visit again.</p>
        </div>
        <img src="h2.jpeg" className="md:w-1/2 " alt="" />
      </div>
      <div className="flex flex-col-reverse md:flex-row w-full md:mt-52 mr-20 justify-start items-center">
        <img src="h3.jpeg" className="md:w-1/2" alt="" />
        <div className="md:w-1/3 md:text-left text-justify p-5">
          <h1 className="md:text-4xl font-bold">Connect with doctors for consultations</h1>
          <p>HealthTracker provides a convenient platform to connect with doctors for consultations. Chat with healthcare professionals and get the guidance you need.</p>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center my-11">
        <h1 className=" md:font-semibold font-bold md:text-2xl">Join Our Community</h1>
        <button className="bg-sky-700 text-white md:text-2xl p-2" onClick={() => navigate("/login")}>
          Get Started
        </button>
      </div>
      <div className="flex justify-between flex-col gap-3 m-3">
        <a href="https://drive.google.com/file/d/1jpKVyNdhwllFdUbMy5LDhiiCzZc1lpUe/view?usp=sharing" target="_blank" className="text-blue-500">Download apk file</a>
        <a href="https://drive.google.com/file/d/15TeE0yOAVw3tU33C1zOs6Tt-2E8Ak-uH/view?usp=sharing" target="_blank" className="text-blue-500">See How to install app</a>
      </div>
    </div>
  );
}

export default Home1;
