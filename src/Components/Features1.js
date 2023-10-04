import React, {useState} from "react";

function Features1() {
  const [activeFeature, setActiveFeature] = useState(null);

  const toggleFeature = (index) => {
    if (activeFeature === index) {
      setActiveFeature(null);
    } else {
      setActiveFeature(index);
    }
  };
 const featuresData = [
    {
     title: "Health Data Tracking",
     content: "Track and record various health metrics, such as weight, height, body mass index (BMI), blood pressure, heart rate, and sleep patterns. Allow users to manually input data or sync with wearable devices and apps. Visualize data using charts and graphs to show progress over time.",
    },
    {
      title: "User Registration and Profiles",
      content: "User registration and login functionality User profile creation to store personal information, health goals, and preferences.",
    },
    {
      title: "Goal Setting and Monitoring",
      content: "Set and customize health goals, such as weight loss, fitness milestones, or daily step counts.Provide tracking tools to monitor progress toward these goals.",
    },
    {
      title: "Personalized Treatment Recommendations",
      content: "Customized treatment plans and recommendations based on the type and stage of cancer detected.",
    },
    {
      title: "Data Privacy and Security",
      content: "Robust data security measures to protect patients' sensitive medical information and maintain compliance with healthcare data regulations.",
    },
    {
      title: "Online Consultations",
      content: "Virtual consultations with healthcare professionals for discussing test results, treatment options, and next steps.",
    },
    {
      title: "Patient Education",
      content: "Educational resources and information about cancer types, treatments, and lifestyle choices to empower patients with knowledge.",
    },
    {
      title: "Data Visualization",
      content: "Interactive charts and visualizations displaying cancer detection results, trends, and progress over time.",
    },
    {
      title: "Integration with Healthcare Systems",
      content: "Seamless integration with electronic health record (EHR) systems and healthcare providers for streamlined patient care.",
    },
    {
      title: "Mobile Accessibility",
      content: "Mobile-friendly design for easy access to cancer detection results and information on smartphones and tablets.",
    },
    {
      title: "Support and Community",
      content: "Online support groups, forums, and community features for patients and caregivers to connect, share experiences, and find emotional support.",
    },
    {
      title: "Research and Development",
      content: "Dedicated research and development efforts to continually improve the accuracy and capabilities of cancer cell detection algorithms.",
    },
  ];



  return (
    <div>
      <div className="lg:w-3/4 w-full border-2 mx-auto min-h-[25rem] m-10 rounded-bl-xl rounded-br-xl">
        <h1 className="w-full h-20 bg-blue-800 flex justify-center items-center text-2xl text-white">Features</h1>
        <div className="m-2s text-start lg:text-justify text-lg p-5">
          {featuresData.map((feature, index) => (
            <div key={index} className=" font-sans shadow-sm">
              <div className="flex items-center justify-between cursor-pointer hover:bg-slate-100" onClick={() => toggleFeature(index)}>
                <h1 className="text-base lg:text-xl font-medium p-2 focus-visible:font-bold">{feature.title}</h1>
                <svg className={`h-6 w-6 transition-transform ${activeFeature === index ? "transform rotate-180" : ""}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              {activeFeature === index && <p className="p-2 px-4 text-sm lg:text-base">{feature.content}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Features1;
