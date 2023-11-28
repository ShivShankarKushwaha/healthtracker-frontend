// Footer.js
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white w-auto p-0 m-0" id="footer">
      <div className="container flex flex-col lg:flex-row justify-between items-center p-5 gap-10 lg:gap-0">
        <div className="text-justify">
          <h2 className="text-xl font-bold mb-2">Contact Us</h2>
          <p className="text-gray-300">Una Himachal Pradesh</p>
          <p className="text-gray-300">Email: shivshankarkushwaha0000@gmail.com</p>
          <p> All rights reserved &copy; Healtracker 2023</p>
        </div>
        <div className="text-justify">
          <h2 className="text-xl font-bold mb-2">Our Goals / Vision</h2>
          <p className="decoration-wavy">Empowering Your Wellness Journey, One Step at a Time.</p>
          <p>Help to Track Progress and Inspiring Healthier Lives.</p>
        </div>
        <div className="float-right">
          <iframe className="w-screen h-52 lg:w-full mx-auto" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3402.5657354084187!2d76.18811517549348!3d31.48113007423195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391adb198180014f%3A0xbf76347093a3aa9a!2sIndian%20Institute%20of%20Information%20Technology%20(IIIT)%20Una!5e0!3m2!1sen!2sin!4v1692297101969!5m2!1sen!2sin" allowFullScreen="" loading="slow" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
