import React from "react";

function Home() {
  return (
    <div style={{ background: "url(https://www.onemedical.com/media/images/Consumer_hero-2x.original.jpg)", backgroundPosition: "center", backgroundSize: "cover", height: "90vh", width: "100vw", backgroundAttachment: "fixed" }}>
      <div className="flex justify-around items-center h-full">
        <span className="w-1/3 h-3/4 border-0 border-gray-400 shadow-lg shadow-slate-600 p-3 accent-slate-800">
          <h1 className="text-xl font-semibold text-blue-400 my-20">Welcome to Health Care</h1>
          <p className="text-justify my-10 text-lg">Our specialized team will analyze your current website, research your primary competitors, and develop and implement a detailed strategy to help increase patient volume and retention.</p>
        </span>
        <span className="w-1/3 h-3/4 border-0 border-gray-400 shadow-lg shadow-slate-600 flex justify-center items-center bg-opacity-4 bg-teal-100 text-justify text-cyan-600">
          <p className="text-ellipsis text-justify p-5  text-lg">Our in-house process involves designing and developing custom web design solutions that match your brand style and meet your goals. Before beginning any work on your website, however, it's essential we align on each step of the process. Expect to meet with many members of the Healthcare Success team to align on marketing goals, design ideas, SEO best practices, content strategy, branding, and development.We rely on collaboration to ensure we get your healthcare website design just right.</p>
          {/* <img src="https://source.unsplash.com/random/?medical" alt="" /> */}
        </span>
      </div>
      <div className="flex place-self-center p-0 m-0">
        <div>
          <img src="https://leverageedublog.s3.ap-south-1.amazonaws.com/blog/wp-content/uploads/2019/10/23170032/Medical-Science-Courses.jpg" alt="Image" />
          <h1></h1>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam, soluta.</p>
        </div>
        <button className="btn" id="btn" style={{ color: "red" }}>
          click
        </button>
      </div>
    </div>
  );
}

export default Home;
